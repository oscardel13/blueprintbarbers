import { useEffect, useMemo, useRef, useState } from "react";
import { getAPI } from "../../../../utils/api";

const TABS = [
  { key: "day", label: "Day" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
  { key: "lifetime", label: "Lifetime" }, // for now = last 24 months (safe)
];

const formatMoney = (n) => {
  const num = Number(n || 0);
  return `$${num.toFixed(0)}`;
};

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d, n) =>
  new Date(d.getFullYear(), d.getMonth() + n, d.getDate());

const sameDayKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const monthKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

const labelMonth = (d) => d.toLocaleString([], { month: "short" });

const labelWeekday = (d) => d.toLocaleString([], { weekday: "short" });

const labelDay = (d) =>
  d.toLocaleString([], { month: "short", day: "numeric" });

const getRange = (tabKey) => {
  const now = new Date();
  const today = startOfDay(now);

  // NOTE: adjust semantics if you prefer "this week" vs "last 7 days"
  if (tabKey === "day") {
    return { start: today, end: addDays(today, 1), bucket: "hour" };
  }
  if (tabKey === "week") {
    return { start: addDays(today, -6), end: addDays(today, 1), bucket: "day" }; // last 7 days
  }
  if (tabKey === "month") {
    return {
      start: addDays(today, -29),
      end: addDays(today, 1),
      bucket: "day",
    }; // last 30 days
  }
  if (tabKey === "year") {
    return {
      start: addMonths(today, -11),
      end: addDays(today, 1),
      bucket: "month",
    }; // last 12 months
  }
  // lifetime (for now): last 24 months to avoid huge raw pulls
  return {
    start: addMonths(today, -23),
    end: addDays(today, 1),
    bucket: "month",
  };
};

const buildBuckets = ({ start, end, bucket }) => {
  const buckets = [];
  const cursor = new Date(start);

  if (bucket === "hour") {
    // 24 hours
    for (let h = 0; h < 24; h++) {
      const d = new Date(start);
      d.setHours(h, 0, 0, 0);
      buckets.push({
        key: `${sameDayKey(d)} ${String(h).padStart(2, "0")}:00`,
        label: `${String(h).padStart(2, "0")}:00`,
        start: new Date(d),
        end: new Date(d.getTime() + 60 * 60 * 1000),
      });
    }
    return buckets;
  }

  if (bucket === "day") {
    while (cursor < end) {
      const d = new Date(cursor);
      buckets.push({
        key: sameDayKey(d),
        label: bucket === "day" ? labelDay(d) : sameDayKey(d),
        start: startOfDay(d),
        end: addDays(startOfDay(d), 1),
        weekday: labelWeekday(d),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    return buckets;
  }

  // month
  const monthStart = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonthStart = new Date(end.getFullYear(), end.getMonth(), 1);

  const m = new Date(monthStart);
  while (m <= endMonthStart) {
    const s = new Date(m.getFullYear(), m.getMonth(), 1);
    const e = new Date(m.getFullYear(), m.getMonth() + 1, 1);
    buckets.push({
      key: monthKey(s),
      label: `${labelMonth(s)} '${String(s.getFullYear()).slice(-2)}`,
      start: s,
      end: e,
    });
    m.setMonth(m.getMonth() + 1);
  }
  return buckets;
};

const sumRevenue = (bookings) =>
  bookings.reduce((sum, b) => sum + Number(b?.service?.price || 0), 0);

const filterCountable = (b) => b.status !== "canceled"; // tweak if you want only finished/confirmed

const PerformanceWidget = ({ barber, defaultTab = "week" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [mode, setMode] = useState("revenue"); // "revenue" | "bookings"

  // cache per tab: { [tabKey]: { bookings, totals, series } }
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // lazy-load when visible
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const range = useMemo(() => getRange(activeTab), [activeTab]);

  const params = useMemo(() => {
    // Match your style: getAPI("/bookings", { barberId, start, end })
    return {
      barberId: barber?._id,
      start: range.start,
      end: range.end,
    };
  }, [barber, range.start, range.end]);
  useEffect(() => {
    if (!isVisible) return;
    if (cache[activeTab]) return;

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAPI(`/bookings`, params);
        const all = res.data || [];

        const countable = all.filter(filterCountable);

        const totals = {
          bookings: countable.length,
          revenue: sumRevenue(countable),
        };

        // bucket for chart
        const buckets = buildBuckets(range);
        const series = buckets.map((bucket) => {
          const inBucket = countable.filter((b) => {
            const t = new Date(b.startTime).getTime();
            return t >= bucket.start.getTime() && t < bucket.end.getTime();
          });

          return {
            label:
              range.bucket === "day" && bucket.weekday
                ? bucket.weekday
                : bucket.label,
            bookings: inBucket.length,
            revenue: sumRevenue(inBucket),
          };
        });

        setCache((prev) => ({
          ...prev,
          [activeTab]: { totals, series },
        }));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [activeTab, cache, isVisible, params, range]);

  const current = cache[activeTab] || {
    totals: { bookings: 0, revenue: 0 },
    series: [],
  };

  const chartSeries = useMemo(() => {
    return (current.series || []).map((p) => ({
      label: p.label,
      value:
        mode === "revenue" ? Number(p.revenue || 0) : Number(p.bookings || 0),
    }));
  }, [current.series, mode]);

  return (
    <div ref={ref} className="border rounded-2xl bg-white shadow-sm p-6 mt-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-gray-900">Performance</p>
          <p className="text-sm text-gray-600">
            Bookings + money made (estimated) by time range.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("bookings")}
            className={`text-sm font-medium px-3 py-1 rounded ${
              mode === "bookings"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Bookings
          </button>
          <button
            type="button"
            onClick={() => setMode("revenue")}
            className={`text-sm font-medium px-3 py-1 rounded ${
              mode === "revenue"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Revenue
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key)}
            className={`text-sm font-medium px-3 py-2 rounded ${
              activeTab === t.key
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border rounded-xl bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-600">Bookings</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {loading && !cache[activeTab] ? "…" : current.totals.bookings}
          </p>
        </div>

        <div className="border rounded-xl bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-600">
            Money made (estimate)
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {loading && !cache[activeTab]
              ? "…"
              : formatMoney(current.totals.revenue)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4">
        {error ? (
          <div className="text-red-600">Error loading performance data.</div>
        ) : !isVisible ? (
          <div className="text-gray-600">Loads when visible…</div>
        ) : loading && !cache[activeTab] ? (
          <div className="h-40 rounded-xl bg-gray-100 animate-pulse" />
        ) : chartSeries.length < 2 ? (
          <div className="text-gray-600">Not enough data to chart yet.</div>
        ) : (
          <LineMiniChart series={chartSeries} />
        )}
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Note: “Lifetime” is capped to the last 24 months for performance.
      </p>
    </div>
  );
};

export default PerformanceWidget;

// Lightweight SVG chart
const LineMiniChart = ({ series }) => {
  const width = 900;
  const height = 160;
  const padding = 16;

  const values = series.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = series.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (series.length - 1);
    const y = padding + ((max - d.value) * (height - padding * 2)) / range;
    return { x, y };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  return (
    <div className="border rounded-xl bg-gray-50 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
        <path
          d={path}
          fill="none"
          strokeWidth="3"
          stroke="currentColor"
          className="text-gray-900"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" className="fill-gray-900" />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-xs text-gray-600">
        <span>{series[0]?.label}</span>
        <span>{series[series.length - 1]?.label}</span>
      </div>
    </div>
  );
};

import { useMemo } from "react";
import EditSectionCardComponent from "../edit-section-card/edit-section-card.component";

const DAYS = [
  { label: "Sunday", key: "sunday" },
  { label: "Monday", key: "monday" },
  { label: "Tuesday", key: "tuesday" },
  { label: "Wednesday", key: "wednesday" },
  { label: "Thursday", key: "thursday" },
  { label: "Friday", key: "friday" },
  { label: "Saturday", key: "saturday" },
];

const isTimeValid = (t) => typeof t === "string" && /^\d{2}:\d{2}$/.test(t);
const toMinutes = (t) => {
  if (!isTimeValid(t)) return NaN;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const WorkingHoursComponent = ({
  barberData,
  setField,

  // ✅ new (from EditPage)
  errorCount = 0,
  errors = [],
  forceOpen,
  onOpenChange,
}) => {
  const hours = barberData.hours || {};

  const setDayBlocks = (dayKey, nextBlocks) => {
    setField(`hours.${dayKey}`, nextBlocks);
  };

  const toggleClosed = (dayKey, isClosed) => {
    setDayBlocks(dayKey, isClosed ? [] : [["09:00", "17:00"]]);
  };

  const addBlock = (dayKey) => {
    const blocks = hours[dayKey] || [];
    setDayBlocks(dayKey, [...blocks, ["09:00", "17:00"]]);
  };

  const removeBlock = (dayKey, index) => {
    const blocks = hours[dayKey] || [];
    setDayBlocks(
      dayKey,
      blocks.filter((_, i) => i !== index),
    );
  };

  const updateBlock = (dayKey, index, which, value) => {
    const blocks = hours[dayKey] || [];
    const next = blocks.map((b, i) => {
      if (i !== index) return b;
      const [start, end] = b;
      return which === "start" ? [value, end] : [start, value];
    });
    setDayBlocks(dayKey, next);
  };

  const dayErrorMap = useMemo(() => {
    const map = {};
    errors.forEach((e) => {
      // ids like hours.monday or hours.monday.0
      const parts = e.id.split(".");
      if (parts[0] !== "hours") return;
      const day = parts[1];
      map[day] = map[day] || [];
      map[day].push(e.msg);
    });
    return map;
  }, [errors]);

  const blockHasError = (dayKey, idx) => {
    return errors.some((e) => e.id === `hours.${dayKey}.${idx}`);
  };

  // light client-side hinting even before save:
  const computeDayOverlap = (dayKey, blocks) => {
    const normalized = (blocks || [])
      .map((b, idx) => ({
        idx,
        start: b?.[0],
        end: b?.[1],
        s: toMinutes(b?.[0]),
        e: toMinutes(b?.[1]),
      }))
      .filter((b) => Number.isFinite(b.s) && Number.isFinite(b.e))
      .sort((a, b) => a.s - b.s);

    for (let i = 1; i < normalized.length; i++) {
      if (normalized[i].s < normalized[i - 1].e) return true;
    }
    return false;
  };

  return (
    <EditSectionCardComponent
      title="Working Hours"
      defaultOpen={false}
      description="Use 24-hour time. Add multiple blocks per day to include breaks."
      errorCount={errorCount}
      forceOpen={forceOpen}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-4">
        {DAYS.map(({ label, key }) => {
          const blocks = hours[key] || [];
          const closed = blocks.length === 0;

          const overlapHint = !closed && computeDayOverlap(key, blocks);
          const dayErrors = dayErrorMap[key] || [];

          return (
            <div
              key={key}
              className="border rounded-xl p-4 bg-gray-50 space-y-3"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800">{label}</p>
                  <p className="text-sm text-gray-600">
                    {closed
                      ? "Closed"
                      : `${blocks.length} time block${blocks.length > 1 ? "s" : ""}`}
                  </p>

                  {/* day-level error */}
                  {dayErrors.length > 0 ? (
                    <p className="text-sm text-red-600 mt-1">
                      {dayErrors[0]}
                      {dayErrors.length > 1
                        ? ` (+${dayErrors.length - 1} more)`
                        : ""}
                    </p>
                  ) : overlapHint ? (
                    <p className="text-sm text-red-600 mt-1">Blocks overlap.</p>
                  ) : null}
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={closed}
                      onChange={(e) => toggleClosed(key, e.target.checked)}
                      className="h-4 w-4"
                    />
                    Closed
                  </label>

                  <button
                    type="button"
                    onClick={() => addBlock(key)}
                    disabled={closed}
                    className={`px-3 py-2 rounded text-sm font-medium ${
                      closed
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    + Add block
                  </button>
                </div>
              </div>

              {!closed && (
                <div className="space-y-3">
                  {blocks.map(([start, end], idx) => {
                    const hasErr = blockHasError(key, idx);
                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end"
                        data-error-id={`hours.${key}.${idx}`}
                      >
                        <div className="space-y-1">
                          <label className="font-medium text-gray-700 text-sm">
                            Start
                          </label>
                          <input
                            type="time"
                            value={start || "09:00"}
                            onChange={(e) =>
                              updateBlock(key, idx, "start", e.target.value)
                            }
                            className={`w-full border p-2 rounded bg-white ${hasErr ? "border-red-400" : ""}`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-medium text-gray-700 text-sm">
                            End
                          </label>
                          <input
                            type="time"
                            value={end || "17:00"}
                            onChange={(e) =>
                              updateBlock(key, idx, "end", e.target.value)
                            }
                            className={`w-full border p-2 rounded bg-white ${hasErr ? "border-red-400" : ""}`}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeBlock(key, idx)}
                          className="text-red-600 hover:text-red-700 font-medium px-2 py-2"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}

                  <p className="text-xs text-gray-500">
                    Tip: Use multiple blocks like{" "}
                    <span className="font-medium">10:00–14:00</span> and{" "}
                    <span className="font-medium">15:00–19:00</span> for a
                    break.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </EditSectionCardComponent>
  );
};

export default WorkingHoursComponent;

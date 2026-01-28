import { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../components/page-header/page-header.component";
import { getAPI } from "../../../utils/api";

import PersonalInfoComponent from "./components/personal-info/personal-info.component";
import ContactInfoComponent from "./components/contact-info/contact-info.component";
import PortfolioInfoComponent from "./components/portfolio-info/portfolio-info.component";
import ServicesInfoComponent from "./components/services-info/services-info.component";
import WorkingHoursComponent from "./components/working-hours/working-hours.component";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentBarber } from "../../../store/barber/barber.reducer";
import { selectCurrentBarber } from "../../../store/barber/barber.selector";

// --- utils ---
const safeStringify = (obj) =>
  JSON.stringify(obj, (key, value) => {
    if (value instanceof File) return "__file__";
    return value;
  });

const safeClone = (obj) => JSON.parse(safeStringify(obj || {}));

const setByPath = (obj, path, value) => {
  if (!path) return obj;
  const keys = path.split(".");
  const next = Array.isArray(obj) ? [...obj] : { ...obj };

  let cur = next;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const existing = cur[k];

    const cloned = Array.isArray(existing)
      ? [...existing]
      : existing
        ? { ...existing }
        : {};
    cur[k] = cloned;
    cur = cloned;
  }

  cur[keys[keys.length - 1]] = value;
  return next;
};

const isEmail = (v) =>
  !v ? true : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());

const isUrl = (v) => {
  if (!v) return true;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
};

const isTimeValid = (t) => typeof t === "string" && /^\d{2}:\d{2}$/.test(t);
const toMinutes = (t) => {
  if (!isTimeValid(t)) return NaN;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// --- validators ---
const validatePersonal = (draft) => {
  const errors = [];
  const name = (draft.name || "").trim();
  const about = (draft.about || "").trim();

  if (!name) errors.push({ id: "personal.name", msg: "Name is required." });
  if (about.length > 500)
    errors.push({
      id: "personal.about",
      msg: "About is too long (max 500 chars).",
    });

  return errors;
};

const validateContact = (draft) => {
  const errors = [];
  const phoneDigits = (draft.phone || "").replace(/\D/g, "");
  if (phoneDigits && phoneDigits.length !== 10) {
    errors.push({
      id: "contact.phone",
      msg: "Phone must be 10 digits.",
    });
  }

  if (draft.contactEmail && !isEmail(draft.contactEmail)) {
    errors.push({
      id: "contact.contactEmail",
      msg: "Enter a valid email address.",
    });
  }

  if (draft.instagramUrl && !isUrl(draft.instagramUrl)) {
    errors.push({ id: "contact.instagramUrl", msg: "Enter a valid URL." });
  }

  if (draft.booksyUrl && !isUrl(draft.booksyUrl)) {
    errors.push({ id: "contact.booksyUrl", msg: "Enter a valid URL." });
  }

  // optional but helpful if they start typing address
  const a = draft.address || {};
  const anyAddress =
    (a.street1 || a.city || a.state || a.zip || a.country || a.street2) && true;

  if (anyAddress) {
    if (!a.street1)
      errors.push({
        id: "contact.address.street1",
        msg: "Street is required.",
      });
    if (!a.city)
      errors.push({ id: "contact.address.city", msg: "City is required." });
    if (!a.state)
      errors.push({ id: "contact.address.state", msg: "State is required." });
    if (!a.zip)
      errors.push({ id: "contact.address.zip", msg: "ZIP is required." });
  }

  return errors;
};

const validateServices = (services = []) => {
  const errors = [];
  services.forEach((s, i) => {
    const name = (s?.name || "").trim();
    const price = Number(s?.price);
    const duration = Number(s?.duration);

    if (!name)
      errors.push({
        id: `services.${i}.name`,
        msg: `Service #${i + 1}: name is required.`,
      });
    if (!Number.isFinite(price) || price < 0)
      errors.push({
        id: `services.${i}.price`,
        msg: `Service #${i + 1}: price must be 0+.`,
      });
    if (!Number.isFinite(duration) || duration <= 0)
      errors.push({
        id: `services.${i}.duration`,
        msg: `Service #${i + 1}: duration must be > 0.`,
      });
  });
  return errors;
};

const validateHours = (hours = {}) => {
  const dayKeys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const errors = [];

  dayKeys.forEach((day) => {
    const blocks = hours?.[day] || [];

    const normalized = blocks
      .map((b, idx) => ({ idx, start: b?.[0], end: b?.[1] }))
      .map((b) => ({ ...b, s: toMinutes(b.start), e: toMinutes(b.end) }));

    normalized.forEach((b) => {
      if (!isTimeValid(b.start) || !isTimeValid(b.end)) {
        errors.push({
          id: `hours.${day}.${b.idx}`,
          msg: `${day}: invalid time.`,
        });
        return;
      }
      if (!(b.s < b.e)) {
        errors.push({
          id: `hours.${day}.${b.idx}`,
          msg: `${day}: start must be before end.`,
        });
      }
    });

    const sorted = normalized
      .filter((b) => Number.isFinite(b.s) && Number.isFinite(b.e))
      .sort((a, b) => a.s - b.s);

    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const cur = sorted[i];
      if (cur.s < prev.e) {
        errors.push({ id: `hours.${day}`, msg: `${day}: blocks overlap.` });
        break;
      }
    }
  });

  return errors;
};

// --- page ---
const EditPage = () => {
  const dispatch = useDispatch();
  const barber = useSelector(selectCurrentBarber);

  const [barberData, setBarberData] = useState({});
  const [initialBarberData, setInitialBarberData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [saveAttempted, setSaveAttempted] = useState(false);
  const [openSection, setOpenSection] = useState(null); // "personal" | "contact" | "services" | "gallery" | "hours"
  const [sectionErrors, setSectionErrors] = useState({
    personal: [],
    contact: [],
    services: [],
    gallery: [],
    hours: [],
  });

  useEffect(() => {
    const fetchBarberData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAPI(`/barbers/me`);
        const data = response.data.barber;

        setBarberData(safeClone(data));
        setInitialBarberData(safeClone(data));
        dispatch(setCurrentBarber(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBarberData();
  }, [dispatch]);

  // basic legacy handler still fine for simple top-level inputs
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setBarberData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // ✅ universal nested setter
  const setField = useCallback((path, value) => {
    setBarberData((prev) => setByPath(prev, path, value));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setBarberData((prev) => ({
      ...prev,
      picture: imageUrl,
      pictureFile: file,
    }));
  }, []);

  const initialHash = useMemo(
    () => safeStringify(initialBarberData),
    [initialBarberData],
  );
  const draftHash = useMemo(() => safeStringify(barberData), [barberData]);
  const isDirty = useMemo(
    () => draftHash !== initialHash,
    [draftHash, initialHash],
  );

  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  const recomputeErrors = useCallback((draft) => {
    const next = {
      personal: validatePersonal(draft),
      contact: validateContact(draft),
      services: validateServices(draft.services || []),
      gallery: [], // wire later if you want (min images, cover, etc.)
      hours: validateHours(draft.hours || {}),
    };
    setSectionErrors(next);
    return next;
  }, []);

  useEffect(() => {
    if (!saveAttempted) return;
    recomputeErrors(barberData);
  }, [barberData, saveAttempted, recomputeErrors]);

  const handleDiscard = () => {
    setBarberData(safeClone(initialBarberData));
    setSaveAttempted(false);
    setSectionErrors({
      personal: [],
      contact: [],
      services: [],
      gallery: [],
      hours: [],
    });
    setOpenSection(null);
  };

  const scrollToFirstError = (errs) => {
    const flat = [
      ...errs.personal,
      ...errs.contact,
      ...errs.services,
      ...errs.gallery,
      ...errs.hours,
    ];
    const first = flat[0];
    if (!first) return;

    const id = first.id;

    const section = id.startsWith("services")
      ? "services"
      : id.startsWith("hours")
        ? "hours"
        : id.startsWith("gallery")
          ? "gallery"
          : id.startsWith("contact")
            ? "contact"
            : id.startsWith("personal")
              ? "personal"
              : null;

    if (section) setOpenSection(section);

    // try to scroll to a field marked with data-error-id
    setTimeout(() => {
      const el = document.querySelector(`[data-error-id="${id}"]`);
      if (el?.scrollIntoView)
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el?.focus) el.focus();
    }, 60);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaveAttempted(true);

    try {
      const errs = recomputeErrors(barberData);
      const total =
        errs.personal.length +
        errs.contact.length +
        errs.services.length +
        errs.gallery.length +
        errs.hours.length;

      if (total > 0) {
        scrollToFirstError(errs);
        return;
      }

      // ✅ No API yet.
      // When you wire it:
      // const payload = JSON.parse(safeStringify(barberData));
      // delete payload.pictureFile;
      // strip gallery file objects + _uiId from services
      // await putAPI(...)
      // setInitialBarberData(serverBarber)
      // setBarberData(serverBarber)
      // dispatch(setCurrentBarber(serverBarber))
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error loading profile.</div>;

  return (
    <div className="container px-4 pb-28">
      <PageHeader title="Edit Profile" />

      <div className="flex flex-col gap-3">
        <PersonalInfoComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          setField={setField}
          errors={sectionErrors.personal}
          errorCount={sectionErrors.personal.length}
          forceOpen={openSection === "personal"}
          onOpenChange={(open) => open && setOpenSection("personal")}
        />

        <ContactInfoComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
          setField={setField}
          errors={sectionErrors.contact}
          errorCount={sectionErrors.contact.length}
          forceOpen={openSection === "contact"}
          onOpenChange={(open) => open && setOpenSection("contact")}
        />

        <ServicesInfoComponent
          barberData={barberData}
          setField={setField}
          errors={sectionErrors.services}
          errorCount={sectionErrors.services.length}
          forceOpen={openSection === "services"}
          onOpenChange={(open) => open && setOpenSection("services")}
        />

        <PortfolioInfoComponent
          barberData={barberData}
          setField={setField}
          errors={sectionErrors.gallery}
          errorCount={sectionErrors.gallery.length}
          forceOpen={openSection === "gallery"}
          onOpenChange={(open) => open && setOpenSection("gallery")}
        />

        <WorkingHoursComponent
          barberData={barberData}
          setField={setField}
          errors={sectionErrors.hours}
          errorCount={sectionErrors.hours.length}
          forceOpen={openSection === "hours"}
          onOpenChange={(open) => open && setOpenSection("hours")}
        />
      </div>

      {isDirty && (
        <div className="sticky bottom-4 z-10">
          <div className="border rounded-2xl shadow-md bg-white p-4 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="font-semibold text-gray-800">
                You have unsaved changes
              </p>

              {saveAttempted ? (
                <p className="text-sm text-gray-600">
                  {sectionErrors.contact.length +
                    sectionErrors.services.length +
                    sectionErrors.hours.length >
                  0
                    ? "Fix the highlighted issues before saving."
                    : ""}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDiscard}
                disabled={saving}
                className="px-4 py-2 rounded border font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60"
              >
                Discard
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded font-medium text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;

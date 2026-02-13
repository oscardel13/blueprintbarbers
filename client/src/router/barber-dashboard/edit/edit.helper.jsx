// --- utils ---
export const safeStringify = (obj) =>
  JSON.stringify(obj, (key, value) => {
    if (value instanceof File) return "__file__";
    return value;
  });

export const safeClone = (obj) => JSON.parse(safeStringify(obj || {}));

export const setByPath = (obj, path, value) => {
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
export const validatePersonal = (draft) => {
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

export const validateContact = (draft) => {
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

export const validateServices = (services = []) => {
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

export const validateHours = (hours = {}) => {
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
      .map((b, idx) => ({ idx, start: b?.start, end: b?.end }))
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

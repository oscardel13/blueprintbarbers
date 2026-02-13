import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleSignIn } from "../../../store/barber/barber.reducer"; // adjust path
import { selectCurrentUser } from "../../../store/user/user.selector"; // adjust path

import { postAPI } from "../../../utils/api"; // if you don't have it yet, swap later

const formatPhoneDisplay = (rawDigits) => {
  const digits = (rawDigits || "").replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const toDigitsOnly = (raw) => (raw || "").replace(/\D/g, "").slice(0, 10);

const isValidEmail = (email) => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidUrl = (url) => {
  if (!url) return true; // optional
  try {
    const u = new URL(url);
    return ["http:", "https:"].includes(u.protocol);
  } catch {
    return false;
  }
};

const BecomeABarberPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    contact: {
      phone: "",
      email: "",
      instagramUrl: "",
    },
    nickname: "",
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
    },
  });

  // simple nested setter (supports: "contact.phone", "address.city", etc.)
  const setField = (path, value) => {
    setForm((prev) => {
      const parts = path.split(".");
      if (parts.length === 1) return { ...prev, [path]: value };

      const [root, key] = parts;
      return {
        ...prev,
        [root]: {
          ...(prev[root] || {}),
          [key]: value,
        },
      };
    });
  };

  // Prefill from logged-in user (once)
  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        phone: prev.contact.phone || user.phone || "",
        email: prev.contact.email || user.email || user.contactEmail || "",
      },
    }));
  }, [user]);

  const phoneDisplay = useMemo(
    () => formatPhoneDisplay(form.contact.phone),
    [form.contact.phone],
  );

  const validate = () => {
    const next = {};

    const effectiveEmail = (
      form.contact.email ||
      user?.email ||
      user?.contactEmail ||
      ""
    ).trim();

    const digits = toDigitsOnly(form.contact.phone);

    if (!digits || digits.length !== 10)
      next.phone = "Enter a valid 10-digit phone number.";
    if (!effectiveEmail || !isValidEmail(effectiveEmail))
      next.email = "Enter a valid email.";

    if (form.nickname && form.nickname.length > 30)
      next.nickname = "Nickname is too long (max 30).";
    if (!isValidUrl(form.contact.instagramUrl))
      next.instagramUrl = "Enter a valid URL (https://...).";

    if (!form.address.street1.trim())
      next.street1 = "Street address is required.";
    if (!form.address.city.trim()) next.city = "City is required.";
    if (!form.address.state.trim()) next.state = "State is required.";
    if (!form.address.zip.trim()) next.zip = "ZIP is required.";

    return next;
  };

  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setSuccess(false);

    if (!user) {
      dispatch(toggleSignIn());
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);

    try {
      const payload = {
        contact: {
          phone: toDigitsOnly(form.contact.phone),
          email: (
            form.contact.email ||
            user.email ||
            user.contactEmail ||
            ""
          ).trim(),
          instagramUrl: (form.contact.instagramUrl || "").trim(),
        },
        nickname: form.nickname?.trim() || "",
        address: {
          ...form.address,
          country: form.address.country || "USA",
        },
      };

      // adjust endpoint if yours differs (e.g. /barbers/apply)
      await postAPI("/barbers", payload);

      setSuccess(true);
    } catch (err) {
      setServerError("Could not submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 pb-16">
        {/* Landing section */}
        <div className="border rounded-3xl bg-white shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Grow your business with bookings that show up
            </h1>
            <p className="mt-3 text-gray-600 text-base sm:text-lg">
              Create your barber profile, list your services, and let clients
              book you directly. You control availability, pricing, and your
              schedule.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border rounded-2xl bg-gray-50 p-5">
                <p className="font-semibold text-gray-900">
                  Bookings & payments
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Clients can book in seconds. Keep your calendar organized.
                </p>
              </div>
              <div className="border rounded-2xl bg-gray-50 p-5">
                <p className="font-semibold text-gray-900">Show your work</p>
                <p className="mt-1 text-sm text-gray-600">
                  Upload a gallery, highlight services, and build trust.
                </p>
              </div>
              <div className="border rounded-2xl bg-gray-50 p-5">
                <p className="font-semibold text-gray-900">Flexible hours</p>
                <p className="mt-1 text-sm text-gray-600">
                  Set your working hours and breaks exactly how you want.
                </p>
              </div>
              <div className="border rounded-2xl bg-gray-50 p-5">
                <p className="font-semibold text-gray-900">Repeat clients</p>
                <p className="mt-1 text-sm text-gray-600">
                  Keep client info organized and encourage re-booking.
                </p>
              </div>
            </div>

            {!user ? (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => dispatch(toggleSignIn())}
                  className="px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800"
                >
                  Sign in to become a barber
                </button>
                <p className="text-sm text-gray-600 sm:self-center">
                  You’ll need an account before creating a barber profile.
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Signed in as{" "}
                  <span className="font-semibold text-gray-900">
                    {user.email || user.contactEmail || "your account"}
                  </span>
                  .
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form section */}
        <div className="mt-6 border rounded-3xl bg-white shadow-sm p-6 sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your barber profile
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Basic info now — you can edit services, gallery, and hours later.
            </p>
          </div>

          {success ? (
            <div className="mt-5 border rounded-2xl bg-green-50 p-4 text-green-800">
              Submitted! Your barber profile is being created.
            </div>
          ) : null}

          {serverError ? (
            <div className="mt-5 border rounded-2xl bg-red-50 p-4 text-red-700">
              {serverError}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-6">
            {/* Contact */}
            <div className="border rounded-2xl bg-gray-50 p-5">
              <p className="text-lg font-semibold text-gray-900">Contact</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={phoneDisplay}
                    onChange={(e) =>
                      setField("contact.phone", toDigitsOnly(e.target.value))
                    }
                    placeholder="303-555-1234"
                    inputMode="tel"
                    className={`w-full border p-2 rounded bg-white ${
                      errors.phone ? "border-red-400" : ""
                    }`}
                    disabled={!user}
                  />
                  {errors.phone ? (
                    <p className="text-sm text-red-600">{errors.phone}</p>
                  ) : null}
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={form.contact.email}
                    onChange={(e) => setField("contact.email", e.target.value)}
                    placeholder={user?.email || "you@example.com"}
                    className={`w-full border p-2 rounded bg-white ${
                      errors.email ? "border-red-400" : ""
                    }`}
                    disabled={!user}
                  />
                  <p className="text-xs text-gray-500">
                    If left blank, we’ll use your account email.
                  </p>
                  {errors.email ? (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <label className="font-medium text-gray-700">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={form.contact.instagramUrl}
                  onChange={(e) =>
                    setField("contact.instagramUrl", e.target.value)
                  }
                  placeholder="https://instagram.com/yourhandle"
                  className={`w-full border p-2 rounded bg-white ${
                    errors.instagramUrl ? "border-red-400" : ""
                  }`}
                  disabled={!user}
                />
                {errors.instagramUrl ? (
                  <p className="text-sm text-red-600">{errors.instagramUrl}</p>
                ) : null}
              </div>
            </div>

            {/* Profile */}
            <div className="border rounded-2xl bg-gray-50 p-5">
              <p className="text-lg font-semibold text-gray-900">Profile</p>

              <div className="mt-4 space-y-1">
                <label className="font-medium text-gray-700">Nickname</label>
                <input
                  type="text"
                  value={form.nickname}
                  onChange={(e) => setField("nickname", e.target.value)}
                  placeholder="Fade King"
                  className={`w-full border p-2 rounded bg-white ${
                    errors.nickname ? "border-red-400" : ""
                  }`}
                  disabled={!user}
                />
                {errors.nickname ? (
                  <p className="text-sm text-red-600">{errors.nickname}</p>
                ) : null}
              </div>
            </div>

            {/* Address */}
            <div className="border rounded-2xl bg-gray-50 p-5">
              <p className="text-lg font-semibold text-gray-900">Address</p>

              <div className="mt-4 space-y-4">
                <div className="space-y-1">
                  <label className="font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={form.address.street1}
                    onChange={(e) =>
                      setField("address.street1", e.target.value)
                    }
                    placeholder="123 Main St"
                    className={`w-full border p-2 rounded bg-white ${
                      errors.street1 ? "border-red-400" : ""
                    }`}
                    disabled={!user}
                  />
                  {errors.street1 ? (
                    <p className="text-sm text-red-600">{errors.street1}</p>
                  ) : null}
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-gray-700">
                    Apt / Suite
                  </label>
                  <input
                    type="text"
                    value={form.address.street2}
                    onChange={(e) =>
                      setField("address.street2", e.target.value)
                    }
                    placeholder="Apt 2B (optional)"
                    className="w-full border p-2 rounded bg-white"
                    disabled={!user}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={form.address.city}
                      onChange={(e) => setField("address.city", e.target.value)}
                      placeholder="Denver"
                      className={`w-full border p-2 rounded bg-white ${
                        errors.city ? "border-red-400" : ""
                      }`}
                      disabled={!user}
                    />
                    {errors.city ? (
                      <p className="text-sm text-red-600">{errors.city}</p>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={form.address.state}
                      onChange={(e) =>
                        setField("address.state", e.target.value)
                      }
                      placeholder="CO"
                      className={`w-full border p-2 rounded bg-white ${
                        errors.state ? "border-red-400" : ""
                      }`}
                      disabled={!user}
                    />
                    {errors.state ? (
                      <p className="text-sm text-red-600">{errors.state}</p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium text-gray-700">ZIP</label>
                    <input
                      type="text"
                      value={form.address.zip}
                      onChange={(e) => setField("address.zip", e.target.value)}
                      placeholder="80202"
                      className={`w-full border p-2 rounded bg-white ${
                        errors.zip ? "border-red-400" : ""
                      }`}
                      disabled={!user}
                    />
                    {errors.zip ? (
                      <p className="text-sm text-red-600">{errors.zip}</p>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      value={form.address.country}
                      onChange={(e) =>
                        setField("address.country", e.target.value)
                      }
                      placeholder="USA"
                      className="w-full border p-2 rounded bg-white"
                      disabled={!user}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              {!user ? (
                <button
                  type="button"
                  onClick={() => dispatch(toggleSignIn())}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800"
                >
                  Sign in to submit
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Become a barber"}
                </button>
              )}

              <p className="text-xs text-gray-500">
                By submitting, you agree to create a public barber profile.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeABarberPage;

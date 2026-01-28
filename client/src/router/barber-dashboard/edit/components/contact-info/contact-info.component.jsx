import { useMemo, useState } from "react";
import EditSectionCardComponent from "../edit-section-card/edit-section-card.component";

const ContactInfoComponent = ({
  barberData,
  handleInputChange,
  setField,

  // ✅ new
  errors = [],
  errorCount = 0,
  forceOpen,
  onOpenChange,
}) => {
  const [showStreet2, setShowStreet2] = useState(
    Boolean(barberData.address?.street2),
  );

  const formatPhone = (raw) => {
    const digits = (raw || "").replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 10);
    setField("phone", digitsOnly);
  };

  const phoneDisplayValue = formatPhone(barberData.phone || "");

  const errorMap = useMemo(() => {
    const map = {};
    errors.forEach((e) => {
      map[e.id] = e.msg;
    });
    return map;
  }, [errors]);

  const has = (id) => Boolean(errorMap[id]);

  return (
    <EditSectionCardComponent
      title="Contact Info"
      defaultOpen={false}
      errorCount={errorCount}
      forceOpen={forceOpen}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-1">
        <label htmlFor="phone" className="font-medium text-gray-700">
          Phone
        </label>
        <input
          data-error-id="contact.phone"
          name="phone"
          type="text"
          placeholder="303-555-1234"
          value={phoneDisplayValue}
          onChange={handlePhoneChange}
          className={`w-full border p-2 rounded ${has("contact.phone") ? "border-red-400" : ""}`}
          inputMode="tel"
        />
        {has("contact.phone") ? (
          <p className="text-xs text-red-600">{errorMap["contact.phone"]}</p>
        ) : (
          <p className="text-xs text-gray-500">
            Digits only are saved internally.
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="contactEmail" className="font-medium text-gray-700">
          Contact Email
        </label>
        <input
          data-error-id="contact.contactEmail"
          name="contactEmail"
          type="email"
          placeholder="you@shop.com"
          value={barberData.contactEmail || ""}
          onChange={(e) => setField("contactEmail", e.target.value)}
          className={`w-full border p-2 rounded ${has("contact.contactEmail") ? "border-red-400" : ""}`}
        />
        {has("contact.contactEmail") ? (
          <p className="text-xs text-red-600">
            {errorMap["contact.contactEmail"]}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <p className="font-medium text-gray-800">Address</p>

        <div className="border rounded-xl p-4 space-y-4 bg-gray-50">
          <div className="space-y-1">
            <label className="font-medium text-gray-700">Street Address</label>
            <input
              data-error-id="contact.address.street1"
              type="text"
              placeholder="123 Main St"
              value={barberData.address?.street1 || ""}
              onChange={(e) => setField("address.street1", e.target.value)}
              className={`w-full border p-2 rounded bg-white ${has("contact.address.street1") ? "border-red-400" : ""}`}
            />
            {has("contact.address.street1") ? (
              <p className="text-xs text-red-600">
                {errorMap["contact.address.street1"]}
              </p>
            ) : null}
          </div>

          {!showStreet2 ? (
            <button
              type="button"
              onClick={() => setShowStreet2(true)}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 underline w-fit"
            >
              + Add apt / suite (optional)
            </button>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <label className="font-medium text-gray-700">Apt / Suite</label>
                <button
                  type="button"
                  onClick={() => {
                    setField("address.street2", "");
                    setShowStreet2(false);
                  }}
                  className="text-xs font-medium text-gray-700 hover:text-gray-900 underline"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                placeholder="Apt, suite, etc."
                value={barberData.address?.street2 || ""}
                onChange={(e) => setField("address.street2", e.target.value)}
                className="w-full border p-2 rounded bg-white"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-gray-700">City</label>
              <input
                data-error-id="contact.address.city"
                type="text"
                placeholder="Denver"
                value={barberData.address?.city || ""}
                onChange={(e) => setField("address.city", e.target.value)}
                className={`w-full border p-2 rounded bg-white ${has("contact.address.city") ? "border-red-400" : ""}`}
              />
              {has("contact.address.city") ? (
                <p className="text-xs text-red-600">
                  {errorMap["contact.address.city"]}
                </p>
              ) : null}
            </div>

            <div className="space-y-1">
              <label className="font-medium text-gray-700">State</label>
              <input
                data-error-id="contact.address.state"
                type="text"
                placeholder="CO"
                value={barberData.address?.state || ""}
                onChange={(e) => setField("address.state", e.target.value)}
                className={`w-full border p-2 rounded bg-white ${has("contact.address.state") ? "border-red-400" : ""}`}
              />
              {has("contact.address.state") ? (
                <p className="text-xs text-red-600">
                  {errorMap["contact.address.state"]}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-gray-700">ZIP</label>
              <input
                data-error-id="contact.address.zip"
                type="text"
                placeholder="80202"
                value={barberData.address?.zip || ""}
                onChange={(e) => setField("address.zip", e.target.value)}
                className={`w-full border p-2 rounded bg-white ${has("contact.address.zip") ? "border-red-400" : ""}`}
              />
              {has("contact.address.zip") ? (
                <p className="text-xs text-red-600">
                  {errorMap["contact.address.zip"]}
                </p>
              ) : null}
            </div>

            <div className="space-y-1">
              <label className="font-medium text-gray-700">Country</label>
              <input
                type="text"
                placeholder="USA"
                value={barberData.address?.country || "USA"}
                onChange={(e) => setField("address.country", e.target.value)}
                className="w-full border p-2 rounded bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="instagramUrl" className="font-medium text-gray-700">
          Instagram URL
        </label>
        <input
          data-error-id="contact.instagramUrl"
          type="url"
          placeholder="https://instagram.com/yourhandle"
          value={barberData.instagramUrl || ""}
          onChange={(e) => setField("instagramUrl", e.target.value)}
          className={`w-full border p-2 rounded ${has("contact.instagramUrl") ? "border-red-400" : ""}`}
        />
        {has("contact.instagramUrl") ? (
          <p className="text-xs text-red-600">
            {errorMap["contact.instagramUrl"]}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="booksyUrl" className="font-medium text-gray-700">
          Booksy URL
        </label>
        <input
          data-error-id="contact.booksyUrl"
          type="url"
          placeholder="https://booksy.com/..."
          value={barberData.booksyUrl || ""}
          onChange={(e) => setField("booksyUrl", e.target.value)}
          className={`w-full border p-2 rounded ${has("contact.booksyUrl") ? "border-red-400" : ""}`}
        />
        {has("contact.booksyUrl") ? (
          <p className="text-xs text-red-600">
            {errorMap["contact.booksyUrl"]}
          </p>
        ) : null}
      </div>
    </EditSectionCardComponent>
  );
};

export default ContactInfoComponent;

import EditSectionCardComponent from "../edit-section-card/edit-section-card.component";

const ContactInfoComponent = ({ barberData, handleInputChange }) => {
  const formatPhone = (raw) => {
    const digits = (raw || "").replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;

    // strip non-digits and hard cap at 10
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 10);

    // store plain digits only
    handleInputChange({
      target: { name: "phone", value: digitsOnly },
    });
  };

  const phoneDisplayValue = formatPhone(barberData.phone || "");

  return (
    <EditSectionCardComponent title="Contact Info" defaultOpen={false}>
      <div className="space-y-1">
        <label htmlFor="phone" className="font-medium text-gray-700">
          Phone
        </label>
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={phoneDisplayValue}
          onChange={handlePhoneChange}
          className="w-full border p-2 rounded"
          inputMode="tel"
        />
      </div>

      <div className="space-y-2">
        <p className="font-medium text-gray-800">Address</p>

        <div className="border rounded-xl p-4 space-y-4 bg-gray-50">
          <div className="space-y-1">
            <label className="font-medium text-gray-700">Street Address</label>
            <input
              name="street1"
              type="text"
              placeholder="Street Address"
              value={barberData.address.street1 || ""}
              onChange={handleInputChange}
              className="w-full border p-2 rounded bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Apt / Suite</label>
            <input
              name="street2"
              type="text"
              placeholder="Apt, suite, etc. (optional)"
              value={barberData.address.street2 || ""}
              onChange={handleInputChange}
              className="w-full border p-2 rounded bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-gray-700">City</label>
              <input
                name="city"
                type="text"
                placeholder="City"
                value={barberData.address.city || ""}
                onChange={handleInputChange}
                className="w-full border p-2 rounded bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-gray-700">State</label>
              <input
                name="state"
                type="text"
                placeholder="State"
                value={barberData.address.state || ""}
                onChange={handleInputChange}
                className="w-full border p-2 rounded bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-gray-700">ZIP</label>
              <input
                name="zip"
                type="text"
                placeholder="ZIP Code"
                value={barberData.address.zip || ""}
                onChange={handleInputChange}
                className="w-full border p-2 rounded bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-gray-700">Country</label>
              <input
                name="country"
                type="text"
                placeholder="Country"
                value={barberData.address.country || "USA"}
                onChange={handleInputChange}
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
          name="instagramUrl"
          type="url"
          placeholder="Instagram URL"
          value={barberData.instagramUrl || ""}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="booksyUrl" className="font-medium text-gray-700">
          Booksy URL
        </label>
        <input
          name="booksyUrl"
          type="url"
          placeholder="Booksy URL"
          value={barberData.booksyUrl || ""}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>
    </EditSectionCardComponent>
  );
};

export default ContactInfoComponent;

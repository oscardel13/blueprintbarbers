import EditSectionCardComponent from "../edit-section-card/edit-section-card.component";

const ServicesInfoComponent = ({ barberData, handleInputChange }) => {
  const services = barberData.services || [];

  const updateServiceField = (index, field, value) => {
    const next = services.map((s, i) =>
      i === index ? { ...s, [field]: value } : s,
    );
    handleInputChange({ target: { name: "services", value: next } });
  };

  const addService = () => {
    const next = [
      ...services,
      { name: "", price: "", duration: "", description: "" },
    ];
    handleInputChange({ target: { name: "services", value: next } });
  };

  const removeService = (index) => {
    const next = services.filter((_, i) => i !== index);
    handleInputChange({ target: { name: "services", value: next } });
  };

  return (
    <EditSectionCardComponent title="Services Information" defaultOpen={false}>
      {services.length === 0 ? (
        <div className="border rounded-xl p-4 bg-gray-50 text-gray-600">
          No services yet. Click{" "}
          <span className="font-medium">Add Service</span> to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 space-y-4 bg-gray-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.name?.trim()
                      ? service.name
                      : `Service #${index + 1}`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Update the details below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Haircut"
                    value={service.name || ""}
                    onChange={(e) =>
                      updateServiceField(index, "name", e.target.value)
                    }
                    className="w-full border p-2 rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    placeholder="40"
                    value={service.price || ""}
                    onChange={(e) =>
                      updateServiceField(index, "price", e.target.value)
                    }
                    className="w-full border p-2 rounded bg-white"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-gray-700">
                    Duration (mins)
                  </label>
                  <input
                    type="number"
                    placeholder="30"
                    value={service.duration || ""}
                    onChange={(e) =>
                      updateServiceField(index, "duration", e.target.value)
                    }
                    className="w-full border p-2 rounded bg-white"
                    min="0"
                    step="5"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-gray-700">Description</label>
                <textarea
                  placeholder="Describe what’s included..."
                  value={service.description || ""}
                  onChange={(e) =>
                    updateServiceField(index, "description", e.target.value)
                  }
                  className="w-full border p-2 rounded bg-white"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={addService}
        className="bg-gray-800 text-white px-4 py-4 rounded w-full hover:bg-gray-700 font-medium"
      >
        + Add Service
      </button>
    </EditSectionCardComponent>
  );
};

export default ServicesInfoComponent;

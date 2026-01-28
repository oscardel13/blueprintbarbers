import { useMemo, useRef } from "react";
import EditSectionCardComponent from "../edit-section-card/edit-section-card.component";

const PersonalInfoComponent = ({
  barberData,
  handleInputChange,
  handleImageChange,
  setField,

  // ✅ new
  errors = [],
  errorCount = 0,
  forceOpen,
  onOpenChange,
}) => {
  const fileInputRef = useRef(null);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const errorMap = useMemo(() => {
    const map = {};
    errors.forEach((e) => (map[e.id] = e.msg));
    return map;
  }, [errors]);

  const has = (id) => Boolean(errorMap[id]);

  return (
    <EditSectionCardComponent
      title="Personal Info"
      defaultOpen={false}
      errorCount={errorCount}
      forceOpen={forceOpen}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col items-center">
        <img
          src={barberData.picture || "/default-profile.png"}
          alt="Profile"
          className="w-40 h-40 object-cover rounded-full mb-4"
        />

        <button
          type="button"
          onClick={triggerFileSelect}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Change Picture
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="space-y-1">
        <label className="font-medium text-gray-700">Name</label>
        <input
          data-error-id="personal.name"
          type="text"
          name="name"
          placeholder="Name"
          value={barberData.name || ""}
          onChange={(e) => {
            // prefer setField if provided; fallback to your existing handler
            if (setField) setField("name", e.target.value);
            else handleInputChange(e);
          }}
          className={`w-full border p-2 rounded ${has("personal.name") ? "border-red-400" : ""}`}
        />
        {has("personal.name") ? (
          <p className="text-xs text-red-600">{errorMap["personal.name"]}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label className="font-medium text-gray-700">Nickname</label>
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={barberData.nickname || ""}
          onChange={(e) => {
            if (setField) setField("nickname", e.target.value);
            else handleInputChange(e);
          }}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="space-y-1">
        <label className="font-medium text-gray-700">About</label>
        <textarea
          data-error-id="personal.about"
          name="about"
          placeholder="About"
          value={barberData.about || ""}
          onChange={(e) => {
            if (setField) setField("about", e.target.value);
            else handleInputChange(e);
          }}
          className={`w-full border p-2 rounded ${has("personal.about") ? "border-red-400" : ""}`}
          rows={4}
        />
        {has("personal.about") ? (
          <p className="text-xs text-red-600">{errorMap["personal.about"]}</p>
        ) : (
          <p className="text-xs text-gray-500">
            Tip: Keep it short and specific (specialties, vibe, location).
          </p>
        )}
      </div>
    </EditSectionCardComponent>
  );
};

export default PersonalInfoComponent;

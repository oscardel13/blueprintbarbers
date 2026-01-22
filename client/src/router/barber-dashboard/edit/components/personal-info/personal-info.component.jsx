import { useRef } from "react";
import EditSectionCardComponent from "../edit-section-card/edit-section-card.component";

const PersonalInfoComponent = ({
  barberData,
  handleInputChange,
  handleImageChange,
}) => {
  const fileInputRef = useRef(null);

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <EditSectionCardComponent title="Personal Info" defaultOpen={false}>
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

        {/* Hidden file input */}
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
          type="text"
          name="name"
          placeholder="Name"
          value={barberData.name}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="space-y-1">
        <label className="font-medium text-gray-700">Nickname</label>
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={barberData.nickname}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="space-y-1">
        <label className="font-medium text-gray-700">About</label>
        <textarea
          name="about"
          placeholder="About"
          value={barberData.about}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>
    </EditSectionCardComponent>
  );
};

export default PersonalInfoComponent;

import { useState } from "react";
import MapPreview from "../../../map-preview/map-preview.component";
import NavigationPopover from "../../../navigation-option-popover/navigation-option-popover.component";
import NearMeIcon from "@mui/icons-material/NearMe";

const MapSection = ({ address, name, profilePicture }) => {
  const [showNavigationOptions, setNavigationOptions] = useState(false);

  const toggleNavigationOptions = () => {
    setNavigationOptions((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <MapPreview address={address} />
      <div className="absolute px-2 bottom-1 z-10 w-full">
        <div className="flex flex-row justify-between bg-white border-gray-200 rounded shadow max-h-14 w-full">
          <div className="flex flex-row py-1">
            <div className="px-2 w-1/6">
              <img
                src={profilePicture}
                alt="Enrique"
                className="w-10 h-10 rounded-full object-fill"
              />
            </div>
            <div className="pl-1 flex flex-col w-5/6">
              <h5 className="font-medium text-left">{name}</h5>
              <span className="text-gray-500 text-xs flex flex-wrap">
                {address}
              </span>
            </div>
          </div>
          {/* href that open navigation to address */}

          <a
            className="flex items-center border border-gray-200 rounded px-2 cursor-pointer hover:bg-gray-300"
            onClick={toggleNavigationOptions}
          >
            <NearMeIcon />
          </a>
        </div>
      </div>
      {showNavigationOptions && (
        <NavigationPopover
          closeTrigger={toggleNavigationOptions}
          address={address}
        />
      )}
    </div>
  );
};

export default MapSection;

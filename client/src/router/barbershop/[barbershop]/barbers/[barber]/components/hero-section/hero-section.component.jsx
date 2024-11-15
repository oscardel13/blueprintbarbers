import React, { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import CopiedPopover from "../copied-popover/copied-popover.component";

const BookingHero = ({ name, address, profilePicture, index }) => {
  const [showPopover, setShowPopover] = useState(false); // State to control CopiedPopover visibility
  const Pic = require(`../../../../../../../assets/${profilePicture}`);

  const handleShareClick = () => {
    // Create URL with query parameter
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("index", index);

    // Use the updated URL with query parameter
    const urlToCopy = currentUrl.toString();

    // Create a temporary input to copy the modified URL
    const tempInput = document.createElement("input");
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    try {
      document.execCommand("copy");
      setShowPopover(true); // Show the CopiedPopover
      setTimeout(() => setShowPopover(false), 2000); // Hide after 3 seconds
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }

    document.body.removeChild(tempInput);
  };

  return (
    <div className="relative">
      <div>
        <div className="absolute top-0 right-0 z-10 bg-[rgb(0,0,0,0.75)] flex flex-col w-32 rounded justify-center items-center p-2">
          <h6 className="text-white font-semibold text-lg">5.0</h6>
          <span className="flex justify-center text-white text-sm">
            136 reviews
          </span>
        </div>
      </div>
      <img
        className="d-block w-full h-[420px] md:h-[650px] object-cover rounded"
        src={Pic}
        alt="barber image"
      />
      <div className="flex flex-col gap-1 py-3">
        <div className="flex flex-row justify-between">
          <h3 className="text-3xl font-bold">{name}</h3>
          <span className="cursor-pointer" onClick={handleShareClick}>
            <IosShareIcon />
          </span>
        </div>
        <span className="text-gray-500 text-xs text-left">{address}</span>
      </div>
      {showPopover && <CopiedPopover />}{" "}
      {/* Show CopiedPopover conditionally */}
    </div>
  );
};

export default BookingHero;

import React, { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import CopiedPopover from "../copied-popover/copied-popover.component";
import { Link } from "react-router-dom";

const FeaturedBarberCard = ({ barber }) => {
  const [showPopover, setShowPopover] = useState(false); // State to control CopiedPopover visibility
    const { nickname, address, picture, name } = barber
  // TODO: update this to just copy URL
  const handleShareClick = () => {
    alert("COPIED URL")
  };

  return (
    <Link to={`/barbers/${barber._id}`}  className="relative w-72 flex-shrink-0">
      <div>
        <div className="absolute top-0 right-0 z-10 bg-[rgb(0,0,0,0.6)] flex flex-col w-20 rounded justify-center items-center p-2">
          <h6 className="text-white font-semibold text-md">5.0</h6>
          <span className="flex justify-center text-white text-[10px]">
            136 reviews
          </span>
        </div>
      </div>
      <img
        className="d-block w-full h-48 object-cover rounded"
        src={picture}
        alt="barber image"
      />
      <div className="flex flex-col gap-1 py-3">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl font-bold">{nickname || name}</h3>
          <span className="cursor-pointer" onClick={handleShareClick}>
            <IosShareIcon />
          </span>
        </div>
        <span className="text-gray-500 text-xs text-left">{address}</span>
      </div>
      {showPopover && <CopiedPopover />}{" "}
      {/* Show CopiedPopover conditionally */}
    </Link>
  );
};

export default FeaturedBarberCard;
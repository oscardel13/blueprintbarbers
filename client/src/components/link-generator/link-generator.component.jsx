import React from "react";
import { Link, useLocation } from "react-router-dom";

const LinkGenerator = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex flex-row items-center flex-wrap">
      {pathSegments.map((segment, index) => (
        <React.Fragment key={index}>
          <Link
            to={`/${pathSegments.slice(0, index + 1).join("/")}`}
            className="mr-2"
          >
            {segment.charAt(0).toUpperCase() +
              segment.slice(1, 13) +
              (segment.length > 13 ? "..." : "")}
          </Link>
          {index < pathSegments.length - 1 && (
            <>
              <div className="bg-black rounded-full h-1 w-1 "></div>&nbsp;&nbsp;
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LinkGenerator;

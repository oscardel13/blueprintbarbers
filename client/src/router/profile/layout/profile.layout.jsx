import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex flex-row min-h-screen w-screen bg-gray-300 p-2 lg:p-5">
      <Outlet />
    </div>
  );
};

export default ProfileLayout;

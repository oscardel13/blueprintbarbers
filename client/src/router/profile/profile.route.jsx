import { useSelector } from "react-redux";
import PageHeader from "../../components/page-header/page-header.component";
import InventoryList from "./components/inventory-list/inventory-list.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Link } from "react-router-dom";
import AppointmentCard from "./appointments/components/appointment-card/appointment-card.component";

const ProfilePage = () => {
  const user = useSelector(selectCurrentUser);
  if (!user) {
    return <div>Need to be logged in to view this page</div>;
  }
  return (
    <>
      <div className="lg:w-1/6"></div>
      <div className="flex flex-col w-full lg:w-2/3">
        <PageHeader title="Account" />
        <div className="flex flex-row py-5 gap-5">
          <img className="w-16 h-16 rounded-full" src={user.picture} alt="" />
          <div className="flex flex-col justify-center">
            <h6>{user.name}</h6>
            <span>{user.email}</span>
            <Link
              to="/account/edit"
              className="underline cursor-pointer hover:text-blue-700"
            >
              Edit
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-3"></div>
        <div className="flex flex-col gap-3">
          <h3 className="text-3xl font-semibold pt-5 pb-2">Appointments</h3>
          <Link
            to="/account/appointments"
            className="text-center bg-gray-800 hover:bg-gray-700 text-white w-56 py-2 rounded-md"
          >
            All Appointments
          </Link>
          {user && user.appointments.length > 0 ? (
            <div className="w-full">
              <h6 className="pb-2">Upcoming Appointments</h6>
              <div className="flex flex-col w-full lg:flex-row flex-wrap gap-3">
                {user.appointments.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))}
              </div>
            </div>
          ) : (
            <h6>No upcoming appointments</h6>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-3xl font-semibold pt-5">Inventory</h3>
          <Link
            to="/account/orders"
            className="bg-gray-800 w-min hover:bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            Orders
          </Link>
          {user && <InventoryList items={user.items} />}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

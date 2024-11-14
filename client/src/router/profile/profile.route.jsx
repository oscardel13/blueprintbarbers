import { useSelector } from "react-redux";
import PageHeader from "../../components/page-header/page-header.component";
import InventoryList from "./components/inventory-list/inventory-list.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="min-h-screen w-screen bg-gray-300 p-5">
      <PageHeader title="Account" />
      <Link
        to="/account/orders"
        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      >
        Orders
      </Link>
      <h3 className="text-3xl font-semibold py-5">Inventory</h3>
      {user && <InventoryList items={user.items} />}
    </div>
  );
};

export default ProfilePage;

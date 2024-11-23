import { Link } from "react-router-dom";

const BarberList = ({ barbers }) => {
  const onClickEdit = () => {};
  return (
    <div className="flex overflow-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="min-w-[1200px] w-[-webkit-fill-available]">
        <div className="flex bg-gray-200 p-4 mb-0">
          <div className="w-2/6">name</div>
          <div className="w-2/6">email</div>
          <div className="w-1/6">phone</div>
          <div className="w-1/6">action</div>
        </div>
        {barbers.map((barber) => (
          <div
            className="flex items-center bg-white p-4 mb-0 border border-gray-300 rounded-md h-32"
            key={barber._id}
          >
            <div className="w-2/6">{barber.name}</div>
            <div className="w-2/6">{barber.email}</div>
            <div className="w-1/6">{barber.phone ? barber.phone : "N/A"}</div>
            <div className="w-1/6">
              <Link
                to={`/dashboard/barbers/${barber._id}/edit`}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarberList;

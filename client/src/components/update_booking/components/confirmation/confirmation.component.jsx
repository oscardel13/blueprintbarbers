import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Confirmation = () => {
  return (
    <div className="relative flex flex-col p-10 text-center bg-white w-screen md:w-[768px] rounded-lg shadow-lg border">
      <div className="flex justify-center mb-5">
        <EventAvailableIcon className="text-6xl" />
      </div>
      <h3>Your booking is waiting on Confirmation!</h3>
    </div>
  );
};

export default Confirmation;

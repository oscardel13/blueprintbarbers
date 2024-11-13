import { useDispatch } from "react-redux";
import { toggleSignIn } from "../../store/user/user.reducer";

const Popover = ({ children }) => {
  const dispatch = useDispatch();
  const triggerSignIn = () => {
    dispatch(toggleSignIn());
  };
  return (
    <div
      className="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-50"
      onClick={triggerSignIn} // Trigger close when clicking outside
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        {/* Close button */}
      </div>
      <button
        className="absolute top-2 left-3 m-4 text-white text-6xl"
        // onClick={(e) => dispatch(toggleSignIn())}
      >
        &times;
      </button>
    </div>
  );
};

export default Popover;

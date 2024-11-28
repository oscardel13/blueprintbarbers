import { useNavigate } from "react-router-dom";

import { getAPI } from "../../utils/api";
import { useEffect } from "react";

const DashboardGuard = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkBarber = async () => {
      try {
        const res = await getAPI(`/barbers/check-barber`);
      } catch (err) {
        window.alert("You are not authorized to access this page");
        return navigate("/");
      }
    };
    checkBarber();
  }, []);

  return <>{children}</>;
};

export default DashboardGuard;

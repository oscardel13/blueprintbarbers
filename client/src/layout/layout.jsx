import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar.layout";
import Footer from "./footer/footer.component";

const Layout = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

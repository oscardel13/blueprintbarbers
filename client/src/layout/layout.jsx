import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar.layout";
import Footer from "./footer/footer.component";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

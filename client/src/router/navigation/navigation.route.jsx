import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "./navigation.style";
import Dropdown from "../../components/dropdown/dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

// import { Navbar } from "./navigation.style";
import Footer from "../../components/footer/footer.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { getAPI } from "../../utils/api";
import { setCurrentUser } from "../../store/user/user.reducer";
{
  /*
    TODO:
    1. Have 
*/
}
const Navigation = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);
  const logout = async () => {
    try {
      dispatch(setCurrentUser(null));
      await getAPI("/auth/logout");
    } catch (err) {
      console.log(err);
    }
  };

  const userLinks = () => {
    if (!currentUser) {
      return (
        <NavLink to="/sign-in" className="block text-gray-400 p-2">
          SIGN IN
        </NavLink>
      );
    }
    if (currentUser.accessLevel === 0) {
      return (
        <Dropdown logout={logout} currentUser={currentUser}>
          <NavLink to="/account" className="block p-2 hover:text-white">
            PROFILE
          </NavLink>
          <NavLink to="/account/orders" className="block p-2 hover:text-white">
            ORDERS
          </NavLink>
        </Dropdown>
      );
    }
    if (currentUser.accessLevel === 1) {
      return (
        <Dropdown logout={logout} currentUser={currentUser}>
          <NavLink to="/dashboard" className="block p-2 hover:text-white">
            DASHBOARD
          </NavLink>
        </Dropdown>
      );
    } else {
      return (
        <Dropdown logout={logout} currentUser={currentUser}>
          <NavLink to="/account" className="block p-2 hover:text-white">
            PROFILE
          </NavLink>
          <NavLink to="/account/orders" className="block p-2 hover:text-white">
            ORDERS
          </NavLink>
          <NavLink to="/dashboard" className="block p-2 hover:text-white">
            DASHBOARD
          </NavLink>
        </Dropdown>
      );
    }
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="z-50">
        {" "}
        {/*fixed="top" */}
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand href="/">BLUEPRINT</Navbar.Brand>
          <div className="lg:hidden">
            <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="block text-gray-400 p-2">
                HOME
              </NavLink>
              <NavLink to="/barbers" className="block text-gray-400 p-2">
                BARBERS
              </NavLink>
              <NavLink to="/store" className="block text-gray-400 p-2">
                STORE
              </NavLink>
            </Nav>
            {userLinks()}
          </Navbar.Collapse>
          <div className="hidden lg:block">
            <CartIcon />
          </div>
        </Container>
      </Navbar>
      <Outlet />
      <Footer />
    </>
  );
};

export default Navigation;

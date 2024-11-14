import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "./navbar.style";
import Dropdown from "../../components/dropdown/dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  selectCurrentUser,
  selectIsSignInOpen,
} from "../../store/user/user.selector";
import { getAPI } from "../../utils/api";
import { setCurrentUser, toggleSignIn } from "../../store/user/user.reducer";
import SignIn from "../../components/sign-in/sign-in.component";
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
  const isSignInOpen = useSelector(selectIsSignInOpen);

  const logout = async () => {
    try {
      dispatch(setCurrentUser(null));
      await getAPI("/auth/logout");
    } catch (err) {
      console.log(err);
    }
  };

  const triggerSignIn = () => {
    dispatch(toggleSignIn());
  };

  const userLinks = () => {
    if (!currentUser) {
      return (
        <div>
          <button
            to="/sign-in"
            className="block text-gray-400 p-2"
            onClick={triggerSignIn}
          >
            SIGN IN
          </button>
          {isSignInOpen && <SignIn />}
        </div>
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
            <NavLink
              to="/barbershops/barbers"
              className="block text-gray-400 p-2"
            >
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
  );
};

export default Navigation;

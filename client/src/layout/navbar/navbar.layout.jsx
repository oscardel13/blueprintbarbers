import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import SignIn from "../../components/sign-in/sign-in.component";
import Dropdown from "../../components/dropdown/dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import {
  selectCurrentUser,
  selectIsSignInOpen,
} from "../../store/user/user.selector";
import { toggleSignIn } from "../../store/user/user.reducer";
import { getAPI } from "../../utils/api";

// Small helper to join class names
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Tailwind-flavored NavLink (active state support)
function TWNavLink({ to, className, children, end = false }) {
  return (
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cx(
          "block px-2 py-2 lg:px-3 lg:py-2 transition-colors",
          isActive ? "text-white" : "text-gray-400 hover:text-white",
          className
        )
      }
    >
      {children}
    </RouterNavLink>
  );
}

// Tailwind-flavored NavLink (active state support)
function DropdownNavLink({ to, className, children, end = false }) {
  return (
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cx(
          "block px-2 py-2 lg:px-3 lg:py-2 transition-colors",
          isActive ? "text-white" : "lg:text-gray-800 hover:text-white",
          className
        )
      }
    >
      {children}
    </RouterNavLink>
  );
}

const Navigation = () => {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);
  const isSignInOpen = useSelector(selectIsSignInOpen);

  const toggleMobile = () => setMobileOpen((s) => !s);

  // log out
  const logout = async () => {
    try {
      await getAPI("/auth/logout");
      window.location.href = "/";
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
        <button
          className="block px-3 py-2 text-gray-400 hover:text-white"
          onClick={triggerSignIn}
        >
          SIGN IN
        </button>
      );
    }

    // Keep your existing access level logic; just render Tailwind links
    if (currentUser.accessLevel === 0) {
      return (
        <Dropdown logout={logout} currentUser={currentUser}>
          <DropdownNavLink to="/account">PROFILE</DropdownNavLink>
          <DropdownNavLink to="/account/appointments">
            APPOINTMENTS
          </DropdownNavLink>
          <DropdownNavLink to="/account/orders">ORDERS</DropdownNavLink>
        </Dropdown>
      );
    }
    if (currentUser.accessLevel === 1) {
      return (
        <Dropdown logout={logout} currentUser={currentUser}>
          <DropdownNavLink to="/dashboard">DASHBOARD</DropdownNavLink>
        </Dropdown>
      );
    }
    return (
      <Dropdown logout={logout} currentUser={currentUser}>
        <DropdownNavLink to="/account">PROFILE</DropdownNavLink>
        <DropdownNavLink to="/account/appointments">
          APPOINTMENTS
        </DropdownNavLink>
        <DropdownNavLink to="/account/orders">ORDERS</DropdownNavLink>
        <DropdownNavLink to="/dashboard">DASHBOARD</DropdownNavLink>
      </Dropdown>
    );
  };

  return (
    <nav className="bg-dark text-white z-50 w-full">
      <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left: brand + mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Mobile toggle */}
            <button
              aria-controls="primary-nav"
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
              className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger / X */}
              <svg
                className={cx("h-6 w-6", mobileOpen ? "hidden" : "block")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={cx("h-6 w-6", mobileOpen ? "block" : "hidden")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <a href="/" className="text-lg font-semibold tracking-wide">
              BLUEPRINT
            </a>
          </div>

          {/* Center: desktop nav */}
          <div className="hidden lg:flex lg:flex-1 ml-5">
            <div id="primary-nav" className="flex items-center gap-2">
              <TWNavLink to="/" end className="px-3">
                HOME
              </TWNavLink>
              <TWNavLink to="/barbers" className="px-3">
                BARBERS
              </TWNavLink>
              <TWNavLink to="/store" className="px-3">
                STORE
              </TWNavLink>
            </div>
          </div>

          {/* Right: user + cart */}
          <div className="flex items-center gap-3">
            {/* Show cart icon on mobile (like original) */}
            <div className="lg:hidden">
              <CartIcon />
            </div>

            {/* User dropdown / sign in */}
            <div className="hidden lg:flex items-center">{userLinks()}</div>

            {/* Desktop cart icon */}
            <div className="hidden lg:block">
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        <div className={cx("lg:hidden", mobileOpen ? "block" : "hidden")}>
          <div className="border-t border-gray-800 py-3 space-y-1">
            <TWNavLink to="/" end className="px-2">
              HOME
            </TWNavLink>
            <TWNavLink to="/barbers" className="px-2">
              BARBERS
            </TWNavLink>
            <TWNavLink to="/store" className="px-2">
              STORE
            </TWNavLink>

            {/* Mobile user links */}
            <div className="pt-2 border-t border-gray-800">{userLinks()}</div>
          </div>
        </div>
      </div>

      {/* Global overlays */}
      {isCartOpen && <CartDropdown />}
      {isSignInOpen && <SignIn />}
    </nav>
  );
};

export default Navigation;

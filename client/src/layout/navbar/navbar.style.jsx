import { NavLink as Link } from "react-router-dom";
import { styled } from "styled-components";

export const Navbar = styled.nav`
    webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 20;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;

    h3{
        text-align:right;
        padding-right:3rem;
        padding-top:2rem;
    }

    &.active{
        background: white;
        border-radius: 2rem;
        display: inline-block;
        color: white;
    }

    &.dropdown-menu{
      background: black;
    }
}
`;
export const NavLink = styled(Link)`
  padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
  text-decoration: none;
  padding-right: var(--bs-navbar-nav-link-padding-x);
  padding-left: var(--bs-navbar-nav-link-padding-x);
  &.active {
    border-radius: 2rem;
    display: inline-block;
    color: white;
  }

  &:hover {
    color: white;
  }
`;

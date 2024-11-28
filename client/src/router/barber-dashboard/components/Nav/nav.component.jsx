// DashboardNav.js
import NavLink from "../NavLink/navlink.component";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import BookIcon from "@mui/icons-material/Book";
import NavLinkDropdown from "../NavLink-dropdown/navlink-dropwdown.component";
import { Link } from "./nav.styles";

const DashboardNav = ({ style, toggleSidebar }) => {
  const onClickLink = () => {
    toggleSidebar();
  };

  return (
    <div id="dashboard-nav-menu" className={style}>
      <div className="p-4">
        <NavLink Icon={ArrowBackIcon} to="/" title="Return to Blueprint" />
        <div className="py-3 text-lg font-semibold tracking-widest">
          <h3>Barber Dashboard</h3>
        </div>
        <hr />
        <NavLink
          Icon={HomeIcon}
          to="/barber"
          title="Home"
          onClick={onClickLink}
        />
        <NavLink
          Icon={AccountBoxIcon}
          to="/barber/edit"
          title="Account"
          onClick={onClickLink}
        />
        <NavLink
          Icon={SettingsIcon}
          to="/barber/settings"
          title="Settings"
          onClick={onClickLink}
        />
      </div>
      <div className="p-4">
        <div className="py-3">
          <h1>Concepts</h1>
          <br />
          <hr />
        </div>
        <NavLinkDropdown Icon={ContentCutIcon} title="Clients">
          <Link to="/barber/clients" onClick={onClickLink}>
            List
          </Link>
          <Link to="/barber/clients/:id" onClick={onClickLink}>
            Details
          </Link>
        </NavLinkDropdown>
        <NavLinkDropdown Icon={BookIcon} to="/barber/bookings" title="Bookings">
          <Link to="/barber/bookings" onClick={onClickLink}>
            List
          </Link>
          <Link to="/barber/bookings/:id" onClick={onClickLink}>
            Details
          </Link>
        </NavLinkDropdown>
      </div>
      {/* Add more links as needed */}
    </div>
  );
};

export default DashboardNav;

// DashboardNav.js
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import NavLink from '../NavLink/navlink.component'
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NavLinkDropdown from '../NavLink-dropdown/navlink-dropwdown.component';
import { Link } from './nav.styles';

const DashboardNav = ({style, toggleSidebar}) => {
    const onClickLink = () => {
        toggleSidebar()
    }

    return (
        <div id="dashboard-nav-menu" className={style}>
            <div className='p-4'>
                <NavLink Icon={ArrowBackIcon} to='/' title="Return to Blueprint"/>
                <NavLink Icon={HomeIcon} to="/dashboard" title="Home" onClick={onClickLink}/>
                <NavLink Icon={AccountBoxIcon} to="/dashboard/account" title="Account" onClick={onClickLink}/>
            </div>
            <div className='p-4'>
                <div className='py-3'>
                    <h1>Concepts</h1>
                    <br/>
                    <hr/>
                </div>
                <NavLinkDropdown Icon={ContentCutIcon}  title="Barbers">
                    <Link to="/dashboard/barbers" onClick={onClickLink}>List</Link>
                    <Link to="/dashboard/barbers/:id" onClick={onClickLink}>Details</Link>
                </NavLinkDropdown>
                <NavLinkDropdown Icon={PeopleIcon} to="/dashboard/clients" title="Users">
                    <Link to="/dashboard/users" onClick={onClickLink}>List</Link>
                    <Link to="/dashboard/users/:id" onClick={onClickLink}>Details</Link>
                </NavLinkDropdown>
                <NavLinkDropdown Icon={InventoryIcon} to="/dashboard/clients" title="Products">
                    <Link to="/dashboard/products" onClick={onClickLink}>List</Link>
                    <Link to="/dashboard/products/create" onClick={onClickLink}>Create</Link>
                </NavLinkDropdown>
                <NavLinkDropdown Icon={ShoppingCartIcon} to="/dashboard/clients" title="Orders">
                    <Link to="/dashboard/orders" onClick={onClickLink}>List</Link>
                    <Link to="/dashboard/orders/:id" onClick={onClickLink}>Details</Link>
                </NavLinkDropdown>
            </div>
            {/* Add more links as needed */}
        </div>
    );
}

export default DashboardNav;

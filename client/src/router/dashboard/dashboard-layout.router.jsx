import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DashboardNav from './compoenents/Nav/nav.component';

const Layout = () => {
    const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 1280);
    const [isXlScreen, setIsXlScreen] = useState(window.innerWidth >= 1280);
  
    const toggleSidebar = () => {
      setOpenSidebar(!openSidebar);
    };
  
    useEffect(() => {
      const handleResize = () => {
        setIsXlScreen(window.innerWidth >= 1280);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
      <div className='flex w-screen'>
        {/* Show DashboardNav based on screen size and openSidebar state */}
        {(isXlScreen || openSidebar) && (
          <DashboardNav
            style={`fixed h-screen bg-[rgb(33,37,41)] col-span-2 text-[rgb(156,163,175)] xl:min-w-[280px] ${
              isXlScreen || openSidebar ? 'block' : 'hidden'
            }`}
            toggleSidebar={toggleSidebar}
          />
        )}
        <div className='xl:ml-[280px] w-screen min-h-screen bg-gray-300 px-3 py-20' onClick={ (isXlScreen || openSidebar) ? toggleSidebar : null}>
          <Outlet />
        </div>
        {/* Toggle button for smaller screens */}
        {window.innerWidth < 1280 && (
          <button
            className={`${openSidebar ? 'hidden' : 'block'} absolute top-0 xl:left-[280px] p-4`}
            onClick={toggleSidebar}
          >
            <DensityMediumIcon />
          </button>
        )}
      </div>
    );
  };
  
  export default Layout;

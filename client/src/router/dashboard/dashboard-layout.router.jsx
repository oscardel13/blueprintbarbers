import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DashboardNav from './compoenents/Nav/nav.component';
import DashboardGuard from './dashboard.guard';

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
      <DashboardGuard>
        <div className='flex w-screen'>
          {/* Show DashboardNav based on screen size and openSidebar state */}
          {(isXlScreen || openSidebar) && (
            <DashboardNav
              style={`fixed h-screen z-2 bg-[rgb(33,37,41)] col-span-2 text-[rgb(156,163,175)] xl:min-w-[280px] ${
                isXlScreen || openSidebar ? 'block' : 'hidden'
              }`}
              toggleSidebar={toggleSidebar}
            />
          )}
          <div className={`xl:ml-[280px] w-[-webkit-fill-available] min-h-screen bg-gray-300 px-3 py-20`} onClick={ (isXlScreen || openSidebar) ? toggleSidebar : null}>
            {(!isXlScreen && openSidebar) && <div className='bg-black opacity-50 inset-0 h-screen w-screen z-1 fixed' />}
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
      </DashboardGuard>
    );
  };
  
  export default Layout;

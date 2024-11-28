import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NavLinkDropdown = (props) => {
  const { Icon, title, children } = props;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='relative'>
      <div className='flex items-center cursor-pointer py-2 hover:bg-[rgba(107,114,128,0.4)] hover:text-white' onClick={toggleDropdown}>
        <div className='flex items-center'>
          <Icon />
          &nbsp;&nbsp;{title}
        </div>
        <div className='text-right ml-2'>
          <KeyboardArrowDownIcon />
        </div>
      </div>
      {isDropdownOpen && (
        <div className='py-1 grid grid-cols-1 gap-2'>
          {children}
        </div>
      )}
    </div>
  );
};

export default NavLinkDropdown;

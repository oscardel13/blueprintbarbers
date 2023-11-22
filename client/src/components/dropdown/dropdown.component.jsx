import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NavigationDropdown = (props) => {
    const { children, currentUser, logout } = props;
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='relative'>
            <div className='flex items-center cursor-pointer p-2 hover:bg-[rgba(107,114,128,0.4)] hover:text-white' onClick={toggleDropdown}>
                <img src={currentUser.picture}  className="h-8 rounded-full"/>
                <div className='text-right ml-2 text-gray-400'>
                <KeyboardArrowDownIcon />
                </div>
            </div>
            {isDropdownOpen && (
                <div className='p-3 text-gray-400 grid grid-cols-1 gap-2 lg:absolute lg:flex lg:flex-col lg:justify-center lg:w-max lg:top-[52px] lg:right-3 lg:bg-gray-300 lg:text-black lg:border-solid lg:border-black lg:border-[1px]'>
                    <div className="flex flex-row p-2 items-center">
                        <img src={currentUser.picture} className="h-16 rounded-full p-1"/>
                        &nbsp;
                        <div className="">
                            <p className="text-sm font-bold">{currentUser.name}</p>
                            <p className="text-sm">{currentUser.email}</p>
                        </div>
                    </div>
                    <hr/>
                    {children}
                    <hr/>
                    <a className="block p-2 cursor-pointer hover:text-white" onClick={logout}>SIGN OUT</a>
                </div>
            )}
        </div>
    );
};

export default NavigationDropdown;

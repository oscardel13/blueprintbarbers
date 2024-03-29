import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-dark'>
      <div className='container mx-auto py-3'>
        <div className='flex justify-between items-center flex-col'>
          <br/>
          <h3 className='text-white text-center lg:text-left'>BLUEPRINT BARBERS</h3>
          <br/>
          <div className='flex items-center'>
            <a href="https://www.facebook.com/profile.php?id=61554102161708" target="_blank">
              <FacebookIcon style={{ color: "#e6dadb", fontSize: "2.5rem" }} />
            </a>
            <a href="https://www.instagram.com/blueprintbarbers_/" target="_blank" className='ml-5'>
              <InstagramIcon style={{ color: "#e6dadb", fontSize: "2.5rem" }} />
            </a>
          </div>
          <br/>
          <div className='text-white'>
            <Link className='underline' to="/legal/privacy" reloadDocument={true}>Privacy Policy</Link>
            &nbsp; & &nbsp;
            <Link className='underline' to="/legal/terms" reloadDocument={true}>Terms of Service</Link>
          </div>
          <br/>
          <div className='flex w-full justify-center justify-end'>
            <small className='text-[#8c8c8e] mr-auto'>2023 BluePrint Barbers</small>
            <small className='text-[#8c8c8e]'>Built by Oscar's Hub</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;

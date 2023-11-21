import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <div className='bg-dark'>
      <div className='container mx-auto py-3'>
        <div className='flex justify-between items-center flex-col'>
          <br/>
          <h3 className='text-white text-center lg:text-left'>BLUEPRINT BARBERS</h3>
          <br/>
          <div className='flex items-center'>
            <a href="https://www.facebook.com/davconstrucllc/" target="_blank">
              <FacebookIcon style={{ color: "#e6dadb", fontSize: "2.5rem" }} />
            </a>
            <a style={{ cursor: "default" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a href="https://www.instagram.com/blueprintbarbers_/" target="_blank">
              <InstagramIcon style={{ color: "#e6dadb", fontSize: "2.5rem" }} />
            </a>
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

import { useNavigate  } from 'react-router-dom';

import { getAPI } from '../../utils/api';
import { useEffect } from 'react';

const DashboardGuard = ({children}) => {
  const navigate = useNavigate();
  useEffect(()=>{
    const checkAdmin = async () => {
      try{
        const res = await getAPI(`/users/checkAdmin`)
      }
      catch(err){
          window.alert("You are not authorized to access this page")
          return navigate("/sign-in");
      }  
    }
    checkAdmin() 
    
  },[])

  return (
    <>
      {children}
    </>
  );
}

export default DashboardGuard;

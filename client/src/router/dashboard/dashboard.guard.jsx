import { useNavigate  } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { getAPI } from '../../utils/api';
import { useEffect } from 'react';

const DashboardGuard = ({children}) => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser)
  useEffect(()=>{
    const checkAdmin = async () => {
        await getAPI(`/users/checkAdmin`)
    }
    if(!user || user == null){
        window.alert("You are not authorized to access this page")
        return navigate("/sign-in");
    }
    else{
        try{
            checkAdmin()   
        }
        catch(err){
            window.alert("You are not authorized to access this page")
            return navigate("/account");
        }
    }
  },[])

  return (
    <>
      {children}
    </>
  );
}

export default DashboardGuard;

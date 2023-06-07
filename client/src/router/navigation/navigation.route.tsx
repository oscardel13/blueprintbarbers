import { Outlet } from "react-router-dom"

import { Navbar } from "./navigation.style";

const Navigation = () => {
    return(
        <>
            <Navbar>
                <h3>Meet the Barbers</h3>
            </Navbar>
            <Outlet/>
        </>
    )
}

export default Navigation;
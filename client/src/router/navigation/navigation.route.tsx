import { Outlet } from "react-router-dom"

import { Navbar } from "./navigation.style";

const Navigation = () => {
    return(
        <>
            <Navbar>
                <h1>Nav</h1>
            </Navbar>
            <Outlet/>
        </>
    )
}

export default Navigation;
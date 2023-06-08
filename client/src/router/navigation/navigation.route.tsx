import { Outlet, Link  } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// import { Navbar } from "./navigation.style";
import Footer from "../../components/footer/footer.component";

const Navigation = () => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link href="/">Home</Nav.Link> */}
                    <Nav.Link href="/barbers">Barbers</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Navigation;
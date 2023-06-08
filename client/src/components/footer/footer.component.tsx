import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () =>{
    return (
        <Navbar collapseOnSelect bg="dark" variant="dark">
            <Container>
            <small style={{color: '#8c8c8e'}}>2023 BluePrint Barbers</small>
            <small style={{color: '#8c8c8e'}}>Built by Oscar Delgado</small>           
            </Container>
        </Navbar>
    )

}

export default Footer
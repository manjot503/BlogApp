import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


function  BasicExample() {
  return (
    <>
       <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
       <Container>
         <Navbar.Brand href="#home">BlOg</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav ">
           <Nav className=' d-flex'>
            
           <Nav><Link className="nav-link fs-5 mx-3 active" to="/">Home</Link></Nav>
             {/* <Nav><Link className="btn bg-white text-success mx-1 "  to="/login">login</Link></Nav>
             <Nav><Link className="btn bg-white text-success mx-1 "  to="/signup">Signup</Link></Nav> */}
             <Nav><Link className="btn bg-white text-success mx-1 center"  to="/blog">Create Blog</Link></Nav>
             <Nav><Link className="btn bg-danger text-white mx-1 "  to="/">log out</Link></Nav>
           


             </Nav>

            <Nav>
           
            </Nav>
            
            

            
         </Navbar.Collapse>
      </Container>
     </Navbar>
     </>
  );
}

export default  BasicExample;
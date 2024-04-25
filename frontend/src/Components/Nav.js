import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { PiUserCircleFill } from "react-icons/pi";
import 'bootstrap/dist/css/bootstrap.min.css';


function  BasicExample() {
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem("token")
    navigate("/signup");

  }
  return (

    <>
       <Navbar expand="lg" className="bg-body-tertiary sticky" bg="dark" data-bs-theme="dark">
       <Container>
         <Navbar.Brand id='icons' href="/signup"><PiUserCircleFill /></Navbar.Brand>
         <Navbar.Toggle aria-controls="navbar-Scroll" />
         <Navbar.Collapse id="navbar-Scroll d-flex " className='justify-content-end'>
           <Nav >
            
           <Nav><Link className="nav-link fs-5 mx-3 active" to="/">Home</Link></Nav>
             {/* <Nav><Link className="btn bg-white text-success mx-1 "  to="/login">login</Link></Nav>
             <Nav><Link className="btn bg-white text-success mx-1 "  to="/signup">Signup</Link></Nav> */}
             <Nav><Link className="btn bg-white text-success mx-1 center"  to="/blog">Create Blog</Link></Nav>
             {/* <Nav><Link className="btn bg-danger text-white mx-1 "  to="/">log out</Link></Nav> */}

             <li className='btn bg-danger text-white mx-1 ' onClick={logout}>logout</li>
           


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
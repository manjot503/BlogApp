import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { PiUserCircleFill } from "react-icons/pi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './one.css';

function  BasicExample() {
  const navigate = useNavigate();
  const [login,setLogin] = useState(false);
  const username = localStorage.getItem("name")?.slice(0,1)
  useEffect(()=>{
    if( localStorage.getItem("token")){
   
    setLogin(!login)
    }
  },[])
  
  
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    navigate("/signup");

  }
  return (
 
    <>
       <Navbar expand="lg" className="bg-body-tertiary sticky" bg="dark" data-bs-theme="dark">
       <Container>
         <Navbar.Brand id='icons' href="/signup">BlogApp</Navbar.Brand>
         <Navbar.Toggle aria-controls="navbar-Scroll" />
         <Navbar.Collapse id="navbar-Scroll d-flex " className='justify-content-end'>
           <Nav >
        
           <Nav><Link className="nav-link fs-5 mx-3 active" to="/">Home</Link></Nav>
        
               {
              login? (
             <li className='user'>{username}</li>
              ):<PiUserCircleFill />
            }
             <Nav><Link className="btn bg-white text-success mx-1 m-1 center d-flex justify-content-center align-items-center"  to="/blog">Create Blog</Link></Nav>
             

            {
              login? (
              <li className='btn bg-danger text-white mx-1 m-1 d-flex justify-content-center align-items-center ' onClick={logout}>logout</li>
              ):null
            }


          

            

        
       

           


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
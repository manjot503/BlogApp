
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import {  useState } from "react";


axios.defaults.baseURL = "http://localhost:5500/";

export default function Otp(){
  const [input, setinput] = useState('')
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
   const location = useLocation();
   const num =location.state?.num;
   console.log(num)
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!input) {
      errors.input = "input is required";
     
    }
  

    setErrors(errors);
    if(Object.keys(errors).length === 0){
      try {
        // const response = await axios.post("user/otp"{
        //   OTP:input
        // })
 
        navigate('/reset')
      } catch (error) {
        console.log("Errors",error)
      }
    }
    
  }
    return(
       
        
      <div className="m-5 " id="center" >
      <form onSubmit={handleSubmit}   className="form bg-light">
        <h1 >Enter your otp</h1>
        <br></br>
      <div></div>  
      
      <input  type="number"  className="inputotp" maxLength={1} name="input"  onChange={(e)=>{setinput(e.target.value)}} />
             {errors.input && <span className="error">{errors.input}</span>} 
   
             <input type="text"  className="inputotp" maxLength={1} name="input" onChange={(e)=>{setinput(e.target.value)}} />
             {errors.input && <span className="error">{errors.input}</span>} 

             <input type="text"  className="inputotp" maxLength={1} name="input"  onChange={(e)=>{setinput(e.target.value)}} />
             {errors.input && <span className="error">{errors.input}</span>} 


             <input type="text"  className="inputotp" maxLength={1} name="input"  onChange={(e)=>{setinput(e.target.value)}} />
             {errors.input && <span className="error">{errors.input}</span>} 
        <button type="submit"   className="button">
          Container
        </button>
   
      </form>
    </div>



    )
}


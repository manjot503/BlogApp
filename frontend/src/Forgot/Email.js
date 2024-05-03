import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500/";


   

export default function Email(otp) {
    const [email, setEmail] = useState('')

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        const otpnum = Math.floor(1000 + Math.random() * 9000);
        console.log(otpnum)
        e.preventDefault();

        let errors = {};
       
        if (!email) {
            errors.email = "Email is required";
            
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid";
            
        }
  
            setErrors(errors);
            if(Object.keys(errors).length ===0){
                try {
                    const response = await axios.post("/user/otp", {
                        email, email,
                        OTP: otpnum});
                    console.log(response.data);
                    navigate("/otp",{state:{num:{otpnum}}})
                } catch (error) {
                    console.log("Errors",error)
                    alert("user not found")
                }
                
            }
    }
  return (
    <div>
       <div className="m-5 " id="center" >
     
     
     <form onSubmit={handleSubmit} className="form bg-light">
     <h2 className="m-2">Enter Your Email</h2>
        
         <div className="m-2">
             <label className="m-2 name">Email:</label>
             <input type="email" className="form-control" name="email"  onChange={(e)=>{setEmail(e.target.value)}} />
             {errors.email && <span className="error">{errors.email}</span>}
         </div>
       
       
     

         
         <div>
      <button type="submit"  className="button" >Container</button>
      
      </div>
     </form>
 </div>
 </div>
    
  )
}
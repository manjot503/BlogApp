
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500/";


export default function Resetpass(){
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword:''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};
       
     
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
            
        }
        setErrors(errors);

       if(Object.keys(errors).length===0){
        navigate("/login")
       }
    }
    return(
        <div>
            <div className="m-5 " id="center">
     
     
     <form onSubmit={handleSubmit} className="form bg-light">
     <h3 className="m-2">Enter New Your Password</h3>   
        
         <div className="m-2">
             <label className="m-2 name" >New Password:</label>
             <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
             {errors.password && <span className="error">{errors.password}</span>}
         </div>
       
         <div className="m-2">
             <label className="m-2 name">confirm Password:</label>
             <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
             {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
         </div>
     

         
         <div>
      <button type="submit"  className="button" >Container</button>
      
      </div>
     </form>
 </div>
        </div>
    )
}
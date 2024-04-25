



import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500/";

const Login = () => {
    const [formData, setFormData] = useState({
       
        email: '',
        password: '',
     
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
       
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }
    

        setErrors(errors);



        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("/user/login", formData);
                console.log(response.data);
                // Clear form data after successful submission if needed
                setFormData({
                    
                    email: '',
                    password: '',
                    
                });     
                
                navigate("/");
               
            } catch (error) {
                console.error("Error:", error);
                alert("user not found")
            }
        
        }
     
    };

    return (
      <div 
    //   style={{ backgroundImage: 'url("https://images.gizbot.com/ph-big/2019/09/apple-iphone-11-pro_1568184874120.jpg")', backgroundSize: 'cover',height: '89.4vh' }}
      >
        <div className="login-form-container">
     
            <br></br>
            <form onSubmit={handleSubmit} className='w-50 m-auto mt-6 border bg-light  border-dark rounded'>
            <h2 className="m-2">Login</h2>
               
                <div className="m-2">
                    <label className="m-2">Email:</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="m-2">
                    <label className="m-2">Password:</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="m-3">
                    Forget Password ?
                </div>
                {/* <button type="submit" className='form_btn'>Sign Up</button> */}
                <div>
             <button type="submit"  className="m-3 btn btn-dark" >Submit</button>
             <Link to="/signup" className="m-3 btn btn-danger">New user</Link>
             </div>
            </form>
        </div>
        </div>

);
};

export default Login;


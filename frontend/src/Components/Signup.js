
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500/";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname:'',
        lastname:'',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (!formData.firstname) {
            errors.firstname = "firstname is required";
        }
        if (!formData.lastname) {
            errors.lastname = "lastname is required";
        }
        if (!formData.username) {
            errors.username = "Username is required";
        }
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
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
        }

        setErrors(errors);

       

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("/user/signup", formData);
                console.log(response.data);
                // Clear form data after successful submission if needed
                setFormData({
                    firstname:'',
                    lastname:'',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate("/login");
            } catch (error) {
                console.error("Error:", error);
                
            }

        }
    };


    return (
      <div 
    //   style={{ backgroundImage: 'url("https://images.gizbot.com/ph-big/2019/09/apple-iphone-11-pro_1568184874120.jpg")', backgroundSize: 'cover',height: '89.4vh' }}
      >
        <div className="signup-form-container">
           
            <br></br>
            <form onSubmit={handleSubmit} className='w-50 m-auto mt-6 border bg-light  border-dark rounded'>
            {/* <h2>Sign Up</h2> */}
            <div className="m-1">
                    <label className="m-1" >Firstname:</label>
                    <input type="text" className="form-control" name="firstname" value={formData.firstname} onChange={handleChange}  />
                    {errors.firstname && <span className="error">{errors.firstname}</span>}
                </div>
                <div className="m-1">
                    <label className="m-1" >Lastname:</label>
                    <input type="text" className="form-control" name="lastname" value={formData.lastname} onChange={handleChange}  />
                    {errors.lastname && <span className="error">{errors.lastname}</span>}
                </div>
                <div className="m-1">
                    <label className="m-1" >Username:</label>
                    <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange}  />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="m-1">
                    <label className="m-1">Email:</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="m-1">
                    <label className="m-1">Password:</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="m-1">
                    <label className="m-1">Confirm Password:</label>
                    <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                {/* <button type="submit" className='form_btn'>Sign Up</button> */}
                <div>
             <button type="submit"  className="m-3 btn btn-dark" >Submit</button>
             <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
             </div>
            </form>
        </div>
        </div>

         );
};

export default Signup;
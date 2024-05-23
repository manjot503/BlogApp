
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import {   useState } from "react";


axios.defaults.baseURL = "http://localhost:5500/";

export default function Otp(){
  const [otp, setOtp] = useState(['','','',''])
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
   const location = useLocation();
   const num = location.state?.num;
  //  console.log(num)

  



  const handleSubmit = async (e) => {
    e.preventDefault()
    const string =  num?.otpnum.toString();
    const enterotp = otp?.join("")
    e.preventDefault();

    let errors = {};
    if (!otp) {
      errors.otp = "otp is required";
     
    }
    setErrors(errors);


    if(Object.keys(errors).length === 0){
      try {
     if(enterotp===string){
      
      navigate('/reset')
     }else{
      alert("otp not verified")
     }
        
        
      } catch (error) {
        console.log("Errors",error)
        alert("user not found")

      }
    }
    
  }
    return(
       
        
      <div className="m-5 " id="center" >
      <form onSubmit={handleSubmit}   className="form bg-light">
        <h1 >Enter your otp</h1>
        <br></br>
              {
                otp.map((_,index)=>(
                  <LabeledInput type="text" maxLength={1} name="input" onChange={(e)=>{
                    let newotp = [...otp]
                    newotp[index] = e.target.value;
                    setOtp(newotp)
                  }} />
                ))
              }

        <button type="submit"   className="button">
          Continue
        </button>
   
      </form>
    </div>



    )
}

function LabeledInput({ type, name,maxLength, value, onChange, errors }) {
  return (
    <label>
      {/* <h6 className="name">{placeholder}</h6> */}
      <input className="inputotp"  type={type}  name={name} maxLength={maxLength} onChange={onChange}  />
      {errors && <span className="error">{errors}</span>}
    </label>
  );
}


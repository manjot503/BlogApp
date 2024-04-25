import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import BasicExample from "./Nav";
import './one.css';

axios.defaults.baseURL = "http://localhost:5500/";

export default function AddBlog() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/signup")
    }
  })
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);
const [spinner,setSpinner] = useState()
  

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear previous errors when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSpinner(true )
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('filename', image);
      
      const token = localStorage.getItem("token")

      try {
        const response = await axios.post("blog/create", data,{
          headers:{
            Authorization: token
          }
        });
        console.log(response);
        // Clear form data after successful submission if needed
        setFormData({
          title: "",
          description: "",
        });
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
     <BasicExample />

      <div className="m-3 " id="center" >
        <form onSubmit={handleSubmit} className="form bg-light">
          <h1 >Create a new Blog</h1>
          <br></br>
          <LabeledInput
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
          />
          <br></br>
          <label>
            <h6 className="ds">Description</h6>
            <br></br>
            <textarea
              type="text"
              className="input"
              value={formData.description}
              name="description"
              onChange={handleChange}
            />
             {errors.description && <span className="error">{errors.description}</span>}
          </label>
          <br></br>
          <LabeledInput
            type="file"
            placeholder="Insert Image"
            onChange={(e) => setImage(e.target.files[0])}
            name="Image: "
          />
          <br></br>
          {/* <button type="submit" className="button">
            Post
          </button> */}
          {
            spinner?(
            <button type="submit" className="button"  disabled>
            Loading
          </button>
           ):( <button type="submit" className="button">
            Post
          </button>
          )
          }
        </form>
      </div>

    </>
  );
}

function LabeledInput({ type, placeholder, name, value, onChange, error }) {
  return (
    <label>
      <h6 className="name">{placeholder}</h6>
      <input id="input"  type={type} placeholder={placeholder} name={name} value={value} onChange={onChange}  />
      {error && <span className="error">{error}</span>}
    </label>
  );
}

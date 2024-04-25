// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import { useState } from "react";
// import BasicExample from "./Nav";
// import './one.css';

// axios.defaults.baseURL = "http://localhost:5500/";

// export default function AddBlog() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "", // Corrected typo here
//   });
//   const [image, setImage] = useState(null);

//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target; // Corrected access to event target value
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     let errors = {};
//     if (!formData.title.trim()) {
//       errors.title = "Title is required";
//     }
//     if (!formData.description.trim()) {
//       errors.description = "Description is required"; // Corrected typo here
//     }

//     setErrors(errors);

//     if (Object.keys(errors).length === 0) {
//         const data = new FormData();
//         data.append('title', formData.title);
//         data.append('description', formData.description);
//         data.append('filename', image);

//         console.log(data)
//       try {
//         const response = await axios.post("blog/create", data);
//         console.log(response);
//         // Clear form data after successful submission if needed
//         setFormData({
//           title: "",
//           description: "", // Corrected typo here
//         });
//         navigate("/");
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   return (
//     <>
//      <BasicExample />
//       <div  id="center" >
//         <form onSubmit={handleSubmit} className="form">
//           <h1>Create a new Blog</h1>
//           <br></br>
//           <LabeledInput
//             type="text"
//             placeholder="Title"
//             name="Title" // Corrected capitalization here
//             onChange={handleChange}
//             errors={errors.title}
//           />
//           <br></br>
//           <label>
//             <h6 className="ds">Description</h6>
//             <br></br>
//             <textarea
//               type="text"
//               className="input"
             
//               name="description" // Corrected capitalization here
//               onChange={handleChange}
//             />
//              {errors.description && <span className="error">{errors.description}</span>}
//           </label>
//           <br></br>
//           <LabeledInput
//             type="file"
//             placeholder="Insert Image"
           
//             onChange={(e) => {
//               setImage(e.target.files[0]) // Corrected setting image state
//             }}
//             name="Image: "
//           />
//           <br></br>
//           <button type="submit" className="button">
//             Post
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// function LabeledInput({ type, placeholder, name, onChange, errors }) {
//   return (
//     <label>
//       <h6 className="name">{name}</h6>
//       <input  type={type} placeholder={placeholder} name={name} onChange={onChange}  />
//       {errors && <span className="error">{errors}</span>}
//     </label>
//   );
// }


import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import BasicExample from "./Nav";
import './one.css';

axios.defaults.baseURL = "http://localhost:5500/";

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

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
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('filename', image);

      try {
        const response = await axios.post("blog/create", data);
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
          <button type="submit" className="button">
            Post
          </button>
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

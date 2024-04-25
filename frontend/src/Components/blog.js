import { useNavigate } from "react-router-dom";

export default function Blog ({title,description,image}) {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/view",{state: {product:{title,description,image}}})
        
    }
    return(
        <div className="home m-3" onClick={handleClick}>
            <div>
           <h2>{title}</h2>
           <h5>{description.slice(0,100) + "..."}</h5>
          </div>
        </div>
    );
}
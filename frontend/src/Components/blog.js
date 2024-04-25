import { useNavigate } from "react-router-dom";

export default function Blog ({title,description,image,date}) {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/view",{state: {product:{title,description,image,date}}})
        
    }
    // const dateTime = date.toString()
    // const dates= dateTime.slice(0,10)
    const dateTime = date?.toString()
    const dates = dateTime?.slice(0,10)
    return(
    
            <div className="home m-3" onClick={handleClick}>
            <p>{dates}</p>
           <h2>{title}</h2>
       
           <h5>{description?.slice(0,100) + "..."}</h5>
          </div>
    
    );
}
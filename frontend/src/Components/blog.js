import { useNavigate } from "react-router-dom";

export default function Blog ({title,description,image,date}) {
    const navigate = useNavigate();
    const dateTime = date?.toString()
    const dates = dateTime?.slice(0,10)
    function handleClick(){
        navigate("/view",{state: {product:{title,description,image,dates}}})
        
    }
  

    return(
    
            <div className="home m-3" onClick={handleClick}>
            <p>{dateTime}</p>
            {/* <img id="imagehome" src={image} width={50} height={50} /> */}
             <h2>{title}</h2>
             
       
           <p>{description?.slice(0,100) + "..."}</p>
          </div>
    
    );
}
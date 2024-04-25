import { useLocation } from "react-router-dom";
import BasicExample from "./Nav";

export default function View(){
    const location = useLocation();
    const product = location.state?.product
    return(
        <>
        <BasicExample />
        <center>
        <div className="m-3">
            <h1>{product.title}</h1>
            <img id="image" src={product.image} width={200} height={200} />
            <p id="po">{product.description}</p>
        </div>
        </center>
        </>
    )
}
import React, { useEffect, useState } from "react"
import BasicExample from "./Nav"
import axios from "axios"
import Blog from "./blog";

axios.defaults.baseURL = "http://localhost:5500/";

export default function Home(){
    const[blog,setBlog]= useState([]);
    useEffect(()=>{
        async function ServerCall(){
            const response = await axios.get("blog/allblogs")
        setBlog(response.data.blog)
        }
        ServerCall();
    },[])
    return(
        <div>
            <BasicExample />
            <div id="center" className="m-5">
        <div   >
            {
            blog.map((item,index) => (
                <div key={index} >
                <Blog title={item.title} description={item.description} image={item.img} />
                </div>
            ))
        }
            </div>
            </div>
        </div>
    )
} 
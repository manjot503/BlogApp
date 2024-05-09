import React, { useEffect, useState } from "react"
import BasicExample from "./Nav"

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500/";

export default function HomeUser(){
    const [user,setUser]= useState({username:"",email:"",blogs:[]})
    useEffect(() => {
        async function serverCall() {
          const response = await axios.get("user/userdata",{
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
          setUser(response.data);
        }
        
        serverCall();
      }, []);

      async function deleteBlog (id){
        try {  
            const response= await axios.delete("blog/delete",{
            headers: {
                Authorization: localStorage.getItem("token")
              },
              data:{
                id:id
              }
              
        })
        const users = user.blogs.filter(item=>item._id !==id)
        setUser({...user,blogs:users})
            console.log(response)
        } catch (error) {
            console.log(error)

        }
      
      }
    
    return(
        <div >
           <BasicExample />
           <div className="homeuser">
            <h1 className="name">{localStorage.getItem("name")?.slice(0,1)}  </h1>
           </div>
           <div id="centerri">
         
            <div>
                <h3>Username   :   {user.username}</h3>
                <h3>Email  :   {user.email}</h3>
                <h5>Blogs  :   {user.blogs.length}</h5>
                {user.blogs && user.blogs.length > 0 ?(
                <table id="table" className="table">
               <thead>
               <tr>
                        <th>Sr.No</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Delete</th>
                    </tr>
               </thead>
                    
                        <tbody id="table">
                        {user.blogs.map((item,index)=>(
                            <tr key={index}>
                               <td>{index+1}</td>
                                <td><img src={item.img} height={50} width={50}></img></td>
                                <td>{item.title}</td>
                                <td>{item.date.toString().slice(0,10)}</td>
                                <td><button onClick={()=>deleteBlog(item._id)}>Delete</button></td>
                            
                            </tr>
                        ))}
                    </tbody>

                
                </table>
                    ):(
                        <h1>No blog found</h1>
                    )}
            </div>
            </div>
        </div>
    )
} 
import axios from "axios";
import React , {useState} from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup(props){
    const [user,setuser]=useState({username:"",email:"",phoneno:"",password:""})
    const [error,seterror]=useState("");
// console.log(username,password);
const validateForm=()=>{
//  console.log("submit");
 const username=user.username;
 const password=user.password;
 const email=user.email;
 const phoneno=user.phoneno;
 if(!username || !password || !email || !phoneno){
     seterror("require username or password");  
 }
 else{  
         seterror("");
         var signupformdata={
         username:user.username,
         email:user.email,
         phoneno:user.phoneno,
         password:user.password
     }
     console.log(signupformdata);
     axios.post("http://localhost:8000/signup", signupformdata)
     .then(function(response){
        Swal.fire('Wow',"Successfully created new account","success");
        console.log(response);
     })
     .catch(function (error) {
         console.log(error);
     })
    //  props.history.push("/signup");
     }
}
const handlechange=(property,event)=>{
    const usercopy={...user};
    usercopy[property]=event.target.value;
    setuser(usercopy);
}
return (
    <>
<div className="form">
        <h3 className="header" >Sign-Up</h3>
        <div>{error}</div>
        <p className="tag">Username</p>
        <input className="username" type="text" value={user.username} onChange={(event)=>handlechange("username",event)} />
        <p className="tag">Email Id</p>
        <input className="email" type="email" value={user.email} onChange={(event)=>handlechange("email",event)} />
        <p className="tag">Phone No.</p>
        <input className="phoneno" type="number" value={user.phoneno} onChange={(event)=>handlechange("phoneno",event)} />
        <p className="tag">  Password</p>
        <input className="password" type="password" value={user.password} onChange={(event)=>handlechange("password",event)} />
        <button  className="submit" type="submit" onClick={validateForm}  >Sign Up</button>
        <div className="gosignup" ><Link to="/signin" className="link">Already have an account? Sign-in </Link></div>
      </div>
    </>
)
}
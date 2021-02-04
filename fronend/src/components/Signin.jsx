import React , {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Signin(props){
    const [user,setuser]=useState({username:"",password:""})
    const [error,seterror]=useState("");
    const validateForm=()=>{
    console.log("submit");
    const username=user.username;
    const password=user.password;
    if(!username || !password){
        seterror("require username or password");
    }
    
     var signinformdata={
         username:username,
         password:password
     };
     console.log(signinformdata);
     axios.post("http://localhost:8000/signin", signinformdata)
     .then(function(response){
        Swal.fire("Wow","Successfully signed in ","success");
        console.log(response.data);
        seterror("");
        props.history.push("/home");
     })
     .catch(function (error) {
         console.log(error);
         seterror("please enter valid username or password");
     });
 
}
const handlechange=(property,event)=>{
    const usercopy={...user};
    usercopy[property]=event.target.value;
    setuser(usercopy);
}
return (
<div className="form" >
        <h3 className="header" >Sign-In</h3>
        <div>{error}</div>
        <p className="tag">Username or Email adress</p>
        <input className="username" type="text" value={user.username} onChange={(event)=>handlechange("username",event)} />
        <p className="tag">  Password</p>
        <input className="password" type="password" value={user.password} onChange={(event)=>handlechange("password",event)} />
        <button  className="submit" onClick={validateForm} >Sign In</button>
        <div className="gosignup"  ><Link to="/signup" className="link">Don't have an account? Sign-up </Link></div>
      </div>
)
}
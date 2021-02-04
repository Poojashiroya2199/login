import axios from "axios";
import React , {useState} from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import { makeStyles } from '@material-ui/core/styles';
// import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  
export default function Signup(props){
    const classes = useStyles();
    const [interest,setintereset]=useState("");
    const [user,setuser]=useState({username:"",email:"",phoneno:"",password:"",confirmpassword:"",userimage:""})
    const [error,seterror]=useState("");
        // console.log(username,password);

        const handleChangeoptions=(event)=>{
            console.log(event.target.value);
            setintereset(event.target.value);
        }
    const validateForm=()=>{
        const username=user.username;
        const password=user.password;
        const email=user.email;
        const phoneno=user.phoneno;
        const confirmpassword=user.confirmpassword;
        const userprofile=user.userimage;
        if(!username || !password || !email || !phoneno || !confirmpassword || !userprofile || password!==confirmpassword){
            seterror("require  valid  details");  
        }
        else{  
         seterror("");
         var signupformdata={
         username:user.username,
         email:user.email,
         phoneno:user.phoneno,
         password:user.password,
         confirmpassword:user.confirmpassword,
         userimage:user.userimage,
         userinterest:interest
         }
        console.log(signupformdata);
        axios.post("http://localhost:8000/signup", signupformdata)
        .then(function(response){
            Swal.fire('Wow',"Successfully created new account","success");
            props.history.push("/home");
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
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
        <p className="tag">Username*</p>
        <input className="username" type="text" value={user.username} onChange={(event)=>handlechange("username",event)} />
        <p className="tag">Email Id*</p>
        <input className="email" type="email" value={user.email} onChange={(event)=>handlechange("email",event)} />
        <p className="tag">Phone No.*</p>
        <input className="phoneno" type="number" value={user.phoneno} onChange={(event)=>handlechange("phoneno",event)} />
        <p className="tag">  Password*</p>
        <input className="password" type="password" value={user.password} onChange={(event)=>handlechange("password",event)} />
        <p className="tag">Confirm Password*</p>
        <input className="password" type="password" value={user.confirmpassword} onChange={(event)=>handlechange("confirmpassword",event)} />
        <p className="tag">Upload Image* </p>
        <input className="file" type="text" value={user.userimage} onChange={(event)=>handlechange("userimage",event)} />
        <div className="options"><p className="tag">Interest</p>
        <NativeSelect
          value={interest}
          onChange={handleChangeoptions}
          name="age"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'age' }}
        >
          <option value={"Sports"}>Sports</option>
          <option value={"Technology"}>Technology</option>
          <option value={"News"}>News</option>
          <option value={"Music"}>Music</option>
          <option value={"Movies"}>Movies</option>
        </NativeSelect>
        </div>
        <button  className="submit" type="submit" onClick={validateForm}  >Sign Up</button>
        <div className="gosignup" ><Link to="/signin" className="link">Already have an account? Sign-in </Link></div>
      </div>
    </>
)
}
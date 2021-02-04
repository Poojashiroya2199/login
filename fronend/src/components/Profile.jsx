import React,{useEffect,useState} from "react";
import axios from "axios";
export default function Profile(props){
    // console.log(props);
    // console.log(props.match.params.id);
    const id=props.match.params.id
    const [user,setuser]=useState({});
    useEffect(()=>{
        const findusers=async ()=>{
         const finduser = await axios.put("http://localhost:8000/profile/"+id);
        setuser(finduser);
        console.log(finduser);
        };
        findusers();
    },[])
    return (
        <div >Profile 
            {/* {user.username} */}
        </div>

    )
}
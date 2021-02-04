import React,{useState,useEffect} from "react";
import axios from "axios";
export default function Home(){

const [list,setlist]=useState([]);

const searchlist=(event)=>{
    console.log(event.target.value);
   const filtervalue=event.target.value;
   console.log(filtervalue);
   if (filtervalue === "") {
       listusers();
    setlist(list);
  } else {
      console.log(list);
   const listcopy=list.filter(item=>item.username.includes(filtervalue)  );
   setlist(listcopy);
  }
}
const listusers=()=>{
    axios.get("http://localhost:8000/home")
    .then(function(response){
        console.log(response.data);
        setlist(response.data);
    })
    .catch(function(error){
        console.log(error)
    });
}
const handledelete=(id)=>{
    // const user=employeelist.filter(employee=>employee._id===id);
    console.log(id);
    axios.delete("http://localhost:8000/deleteuser/"+id)
    .then(function(response){
        console.log(response);
        listusers();
    })
    .catch(function(error){
        console.log(error);
    });
};

useEffect(() => {
    listusers();
    // searchlist();
}, []);


    return <div className="homecontainer">
        <input placeholder="searchuser" type="text" onChange={searchlist}/>
         <div className="list">
                <ul>{
                    list.length>0?list.map(user=>(
                        <li key={user._id}>
                            <div><img src={user.userimage} alt="" width="100px" height="100px"/></div>
                            <div >Name :{user.username} </div>
                            <div>Email :{user.email}</div>
                            <button onClick={()=>handledelete(user._id)}>delete</button>
                        </li>
                    )):"users not existed"
                }</ul>
            </div>
    </div>;
}
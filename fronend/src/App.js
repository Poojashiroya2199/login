import React from "react";
import './App.css';
import Signin from "./components/Signin"
import {Route,Redirect} from "react-router-dom";
import Home from "./components/Home"; 
import Signup from "./components/Signup";
function App() {
  
  return (
    <div className="App">
      <Route path="/home" component={Home} />
      <Route path="/signup" component={Signup}/>
      <Route path="/signin" exact component={Signin}/>
      <Redirect to="/signin"/>
    </div>
  );
}

export default App;

import React from "react";
import './App.css';
import Signin from "./components/Signin"
import {Route} from "react-router-dom";
import Home from "./components/Home"; 
import Signup from "./components/Signup";
import Profile from "./components/Profile";
function App() {
  
  return (
    <div className="App">
      <Route path="/home" component={Home} />
      <Route path="/signup" component={Signup}/>
      <Route path="/signin" exact component={Signin}/>
      <Route path="/profile/:id" component={Profile}/>
      {/* <Redirect to="/signin"/> */}
    </div>
  );
}

export default App;

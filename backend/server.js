const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const User=require("./userModel");
const axios=require("axios");
const port = 8000;
const app=express();

app.use(cors());
const hostname="localhost";

mongoose.connect('mongodb+srv://newuser:pooja123@cluster0.x7i06.mongodb.net/signup?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},(error)=>{
    if(error){
        console.log("connection not establish");
    }
    else{
        console.log("connection establish");
    }
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.post("/signin",async function(req,res){
    console.log(req.body);
    const signinUser= await User.findOne({
        username:req.body.username,
        password:req.body.password
    });
    console.log(signinUser);
    if(signinUser){
        res.status(200).send({
        username:signinUser.username,
        email:signinUser.email,
        password:signinUser.password
        });
       
    }else{
        res.status(401).send({message:"Invalid Email or Password"});
    }
})
app.post("/signup",async function(req,res){
    console.log(req.body);
    var username=req.body.username;
    var email=req.body.email;
    var phoneno=req.body.phoneno;
    var password=req.body.password;
    var confirmpassword=req.body.confirmpassword;
    var userimage=req.body.userimage;
    var userinterest=req.body.userinterest;
        const signupuser=await User.findOne({
            username,email,phoneno
        });
        if(signupuser){
            console.warn("already existed user");
            res.status(400).send("already existed user");
        }
        else{
       // a document instance
      var User1 = new User({ username: username, email:email, phoneno:phoneno,password:password,confirmpassword:confirmpassword,userimage:userimage,userinterest:userinterest });
      // save model to database

      User1.save(function (err,data) {
        if (err) {
            // console.log(res.config.data)
            res.send({status:0,result:err});
        }
        else{
            res.send({status:1,result:data});
        }
      });
    }
});
app.put("/profile/:id",async function(req,res){
    const id=req.params.id;
    const profileuser=await User.findOne({
        id
    });
    if(profileuser){
        console.log(profileuser);
        res.send(profileuser);
    }
})
app.delete("/deleteuser/:id",(req,res)=>{
    console.log(req.params.id);
    console.log("delete");
    const result=User.deleteOne({_id:req.params.id}).exec();
    res.send(result);
    
})
app.get("/home",(req,res)=>{
    User.find({}, function(err, data){
        console.log(">>>> " + data );
        res.send(data);
    });
})
app.get("/signin",(req,res)=>{
    // console.log("login");
    res.send("login");
});
app.listen(port,hostname,()=>{console.log("server listening on " + port)})
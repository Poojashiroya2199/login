const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

const url="mongodb://localhost/user";
mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser:true}, (error)=>console.log(error));
const hostname="localhost";

app.post("/signup",function(req,res){
    console.log("...",req.body);
    var signupschema=new mongoose.Schema({
        name:String,
        email:String,
        phoneno:Number,
        password:String
    })
    var User=mongoose.model("User",signupschema);
    var User1=new User({
         name:req.body.name,
    email:req.body.email,
    phoneno:req.body.phoneno,
    password:req.body.password
    });
    User1.save(function(err,data){
        if(err){
            res.send({status:0,result:err});
        }
        else{
            res.send({status:1,result:data});
        }
    })
});
app.get("/",(req,res)=>{
    res.send("login");
})

app.listen(8000,hostname,()=>console.log("server started at http://localhost:8000"));

const mongoose=require("mongoose");

var SignUpSchema = new mongoose.Schema({
    username: String,
    email:String,
    phoneno:Number,
    password:String,
    confirmpassword:String,
    userimage:String,
    userinterest:String
  });

  // compile schema to model
var User = mongoose.model('User', SignUpSchema);
module.exports=User;
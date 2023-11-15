const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    "email":{type:String},
    "username":{type:String},
    "password":{type:String}
},{
    collection:"userdetails"
})

module.exports=mongoose.model("UserSchema",userschema);
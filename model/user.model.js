const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    emial:String,
    gender:String,
    password:String
},{
    versionKey:false
})
const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}
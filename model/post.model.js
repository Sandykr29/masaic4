const mongoose = require("mongoose");

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    },{
    versionKey:false
})
const postModel=mongoose.model("user",postSchema)

module.exports={
    postModel
}
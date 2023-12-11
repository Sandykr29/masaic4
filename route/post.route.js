const express=require("express")
const {PostModel}=require("../model/post.model")
const postRouter=express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {auth}=require("../middleware/auth.middleware")


postRouter.post("/add",auth,async(req,res)=>{
try {
    const post=new PostModel(req.body)
    await post.save();
    res.status(200).send({"msg":"A new post has been added"})
} catch (error) {
    res.status(400).send({"error":error})
}
})


postRouter.patch("/update:postID",auth,async(req,res)=>{
    const {postID}=req.params
    try {
        const post=await PostModel.findOne({_id:postID})
        if(req.body.userID===post.userID){
            await post.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":`Post with ID:${postID} has been updated`})
        }else{
            res.status(200).send({"msg":"You are not authorised"})
        }
    } catch (error) {
        res.status(400).send({"msg":"You are not authorised"})
    }
})

postRouter.delete("/update:postID",auth,async(req,res)=>{
    const {postID}=req.params
    try {
        const post=await PostModel.findOne({_id:postID})
        if(req.body.userID===post.userID){
            await post.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":`Post with ID:${postID} has been Deleted`})
        }else{
            res.status(200).send({"msg":"You are not authorised"})
        }
    } catch (error) {
        res.status(400).send({"msg":"You are not authorised"})
    }
})

module.exports={
    postRouter
}
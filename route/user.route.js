const express=require("express")
const {UserModel}=require("../model/user.model")
const userRouter=express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
try {
    bcrypt.hash(password, 5, async(err, hash)=> {
        // Store hash in your password DB.
        if(err){
            res.status(200).send({"err":err})
        }
        else{
            const user=new UserModel({name,email,gender,password:hash})
            await user.save();
            res.status(200).send({"msg":"A new user has been added"})
        }
    })
} catch (error) {
    res.status(400).send({"err":err})
}
})

userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body
try {
    const user=await UserModel.findOne({email})
    bcrypt.compare(Password, user.password, async(err, result) =>{
      if(result){
        const token=jwt.sign({ userID:user._id,username:user.name }, 'socio');
        res.status(200).send({"msg":"Login Successfull!","token":token})
      }
      else{
        res.status(200).send({"msg":"Wrong Credentials..."})
      }
    })
} catch (error) {
    res.status(400).send({"error":error})
}
})

module.exports={
    userRouter
}
const express=require("express");
const {connection}=require('./db')
const app=express();


app.listen(8080,async()=>{
    try {
        await connection;
        console.log("connected to DB")
        console.log("Server is running at 8080")
    } catch (error) {
        console.log(error)
    }
    
})
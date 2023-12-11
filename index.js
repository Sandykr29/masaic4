const express=require("express");
const {connection}=require('./db')
const app=express();
const {postRouter}=require("./route/post.route")
const {userRouter}=require("./route/user.route")
app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("connected to DB")
        console.log("Server is running at 8080")
    } catch (error) {
        console.log(error)
    }
    
})
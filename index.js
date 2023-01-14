// const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const express = require("express")
const cors = require('cors')
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
const {connection} = require("./configer/configer")
const {UserModel} = require("./model/user.model")
const {noteRouter} = require("./routes/note.route");
const {userRouter} = require("./routes/user.route")
const { authenticate } = require("./middleware/auth");
const {logger} = require("./middleware/logger")
app.use(cors({
    origin:"*"
}))
 app.use("/user",userRouter)
app.use(authenticate)
app.use("/note", noteRouter)
app.use(logger)


//GET WELCOME=========================================>

app.use("/",(req,res)=>{
    res.send("WELCOME")
})

//Server==============================================>
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("error")
        console.log(error)
    }

})


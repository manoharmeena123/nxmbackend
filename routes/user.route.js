const express = require("express")
const userRouter = express.Router()
const {UserModel} = require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
//Register====================================================>

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age} = req.body
    const userpresent = await UserModel.findOne({email})
    if(userpresent){
        res.json("Already exist,Please login")
    }else{
    try {
        bcrypt.hash(pass, 8, async(err, hash)=>{
         const user = new UserModel({name,email,pass:hash,age})
        await user.save()
        res.json("Hurry, User has been created !!")
        })
        
    }catch (error) {
        console.log(Error)
        res.json("error in register")
    }
}
})

//Login=====================================================>

userRouter.post("/login",async(req,res)=>{
    const {email,pass}= req.body
    try {
        const user = await UserModel.find({email})

        if(user.length>0){
          const hashed_pass = user[0].pass;
          bcrypt.compare(pass, hashed_pass, (err, result)=>{
         if(result){
              const token = jwt.sign({"userID":user[0]._id},'masai'); //{expiresIn:"1h"}
              res.json({"msg":"Login Successfully","token":token})
         }else{
            res.json({"msg":"Login failed"})
         }
        })
           
           }else{
               res.json({"msg":"Wrong Credential"})
               console.log(err)
           }

    } catch (error) {
        console.log(Error)
        res.json("Something went wrong")
    }
})

//about====================================================>

userRouter.get("/get",async(req,res)=>{
    const user =await UserModel.find()
    res.json(user)
})

userRouter.get("/cart",(req,res)=>{
    const token = req.headers.authorization
    jwt.verify(token,"masai",(err ,decoded)=>{
      if(err){
          res.json("Invalid token,Please login again")
          console.log(err)
      }else{
        res.json("Cart....")
      }
    })
})

userRouter.get("/data",(req,res)=>{
  const token = req.headers.authorization
  jwt.verify(token,"masai",(err ,decoded)=>{
    if(err){
        res.json("Invalid token,Please login again")
        console.log(err)
    }else{
      res.json("Data....")
    }
  })
})



module.exports ={
    userRouter
}
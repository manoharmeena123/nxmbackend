const express =require("express")
const app =express()
const fs=require("fs")


const logger=(req,res,next)=>{
    const startTime=new Date().getTime()
    next()
    const endTime=new Date().getTime()
    const Timetaken=endTime-startTime
    const date= new Date().getDate() 
    const month=new Date().getMonth()
    const year =new Date().getFullYear()
    fs.appendFileSync("./log.txt",  "\n"+"Method" +"="+ req.method+" "+"URL" +"=" +req.url + "TimeTaken"+"="+Timetaken +" "+ "date"+"="+date+"/"+month+"/"+year ,"utf-8")
    console.log(date)
}


module.exports ={
    logger
}
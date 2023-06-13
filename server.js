//import express
const exp=require("express")
//create express application
const app=exp()
//import cors
const cors = require('cors');

//using cors
app.use(cors());

//import sequelize from db.config.js
const sequelize=require("./database/db.config")

//importing router from index.js
const router = require("./routes")
const Employee = require("./database/models/employee.model")

//test the DB connection
sequelize.authenticate()
.then(()=>console.log("DB connection successful"))
.catch((err)=>console.log("error",err))

// console.log("employee model....",Employee)

//middleware for routing
app.use("/",router)

//invalid path middleware
app.use("*",(req,res,next)=>{
  res.status(400).send({message:"Invalid path"})
})

//default error handling middleware
app.use((err,req,res,next)=>{
  res.status(400).send({"error":err.message})
})

//exporting app
module.exports=app
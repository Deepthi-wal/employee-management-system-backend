//importing controllers
const { register,login,edit, clockIn, clockOut, timesheet, deleteTimesheet } = require("../../controllers/employees.controller")

//handler for registration
const registerHandler = async(req,res)=>{
  try{
    //call to registration controller
    const result=await register(req.body)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//handler for login
const loginHandler = async(req,res)=>{
  try{
    //call to login controller
    const result=await login(req.body)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//hadnler for user details updation
const editHandler = async(req,res)=>{
  try{
    //call to user update controller
    const result=await edit(req)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//handler for clock in
const clockInHandler = async(req,res)=>{
  try{
    //call to clock in controller
    const result=await clockIn(req)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//handler for clock out
const clockOutHandler = async(req,res)=>{
  try{
    //call to clock out controller
    const result= await clockOut(req)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//handler for adding timesheet
const timesheetHandler = async(req,res)=>{
  try{
    //call to timesheet controller
    const result= await timesheet(req)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//handler for deleting timesheet
const deleteTimesheetHandler = async(req,res)=>{
  try{
    //call to delete timesheet controller
    const result = await deleteTimesheet(req)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//exporting handlers
module.exports={registerHandler,loginHandler, editHandler, clockInHandler, clockOutHandler, timesheetHandler, deleteTimesheetHandler}
//importing controllers
const { employees, employeeByID, deleteEmployeeById, project, addEmployeeToProject } = require("../../controllers/admin.controller")

//handler for getting all employees
const employeesHandler=async(req,res)=>{
  try{
    //call to employees controller
    const result=await employees()
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  } 
}

//handler for getting employee by id
const employeeByIdHandler=async(req,res)=>{
  try{
    //call to employeeById controller
    const result = await employeeByID(req)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//handler for deleting employee
const deleteEmployeeByIdHandler=async(req,res)=>{
  try{
    //call to delete employee controller
    const result=await deleteEmployeeById(req)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//handler for creating project
const projectHandler=async(req,res)=>{
  try{
    //call to project controller
    const result=await project(req.body)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//handler for adding employees to project
const addEmployeeToProjectHandler=async(req,res)=>{
  try{
    //call to add employee to project controller
    const result=await addEmployeeToProject(req)
    //send response
    res.send(result)
  }catch(error){
    //send error message
    res.send({"error":error.message})
  }
}

//exporting handlers
module.exports={employeesHandler,employeeByIdHandler,deleteEmployeeByIdHandler,projectHandler,addEmployeeToProjectHandler}
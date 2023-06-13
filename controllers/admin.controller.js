//importing models
const Employee = require("../database/models/employee.model");
const Projects = require("../database/models/projects.model");
const EmployeeProject = require("../database/models/employeeProject.model");
const Address = require("../database/models/address.model");
//import sequelize from db.config
const sequelize=require("../database/db.config")
//importing Op from sequelize
const { Op } = require("sequelize");


//get all employees details
const employees = async () => {
  try{
    //get details of all employees
  let employees = await Employee.findAll({
    where: { [Op.not]: [
      { role:"admin" },
    ],
    isActive:true
  },
    attributes: {
      exclude: ["password", "image", "role", "isActive", "addressId", "createdBy", "updatedBy", "createdAt", "updatedAt"],
    },
    include:[
     {
      model: Address,
      attributes:{
        exclude:["createdBy", "updatedBy", "createdAt", "updatedAt"]
      }
    }
  ]
  });
  //send employees details
  return{ message: "All employees", payload: employees };
  }catch(error){
    throw error
  }
};

//get employee by id
const employeeByID = async(req) => {
  try{
  console.log("employee by id...")
  //get employee id from req.params
  let empId = req.params.empId;
  //get employee details having empId
  let employee = await Employee.findOne({
    where: { id: empId, isActive:true },
    attributes: {
      exclude: ["password", "image", "role", "isActive", "addressId", "createdBy", "updatedBy", "createdAt", "updatedAt"],
    },
    include:[
      {
        model: Address,
        attributes:{
          exclude:["createdBy", "updatedBy", "createdAt", "updatedAt"]
        }
      }
    ]
  });
  //if employee does not exist
  if (employee === null) {
    return { message: "Employee not found" };
  }else { //if employee exists
    return {
        message: `employee details whose id is ${empId}`,
        payload: employee,
      };
  }
}catch(error){
  throw error
}
};

//delete an employee by id
const deleteEmployeeById = async (req) => {
  const t=await sequelize.transaction();
  try{
  //get empId from req.params
  let empId = req.params.empId;
  //get employee details having empId
  let employee = await Employee.findOne({ where: { id: empId }, transaction:t });
  //if employee does not exist
  if (employee === null) {
    return { message: "Employee not found" };
  } else { //if employee exists
    await Employee.update( {isActive:false}, { where: { id: empId }, transaction:t });
    await t.commit()
    return { message: "Employee deleted" };
  }
}catch(error){
  await t.rollback()
  throw error
}
};

//create project
const project = async (body) => {
  const t=await sequelize.transaction();
  try{
  //get data from req.body and create record for it
  await Projects.create(body,{transaction:t}); 
  await t.commit()
  //send response
  return { message: "project created" };
}catch(error){
  await t.rollback()
  throw error
}
};

//adds employee to project
const addEmployeeToProject = async (req) => {
  const t=await sequelize.transaction();
  try{
  //get employee with empId
  let employee = await Employee.findOne({ where: { id: req.body.empId } , transaction: t });
  //if employee does not exist with that id
  if (employee === null) {
    return{ message: `employee does not exist with employee Id ${req.body.empId}`,};
  } else { //if employee exists assign project
    await EmployeeProject.create({empId:req.body.empId, projectId:req.body.projectId, createdBy:req.body.createdBy}, {transaction: t})
    await Employee.update({department:req.body.department, role:req.body.role},{where:{id:req.body.empId}})
    await t.commit()
    return { message: `project allocated for employee with employee Id ${req.body.empId}`};
  }
}catch(error){ 
  await t.rollback()
  throw error
}
};

//export controllers
module.exports={employees,employeeByID, deleteEmployeeById,project,addEmployeeToProject}
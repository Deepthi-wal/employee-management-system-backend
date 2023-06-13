//importing express
const exp = require("express");
//creating express mini application
const adminApp = exp.Router();

//body parser
adminApp.use(exp.json());

//import admin middleware
const verifyToken = require("../../middlewares/admin.middleware");
//import validators
const { validateEmployeeId, validateProjectSchema, validateAddEmployeeToProject, validateAddingEmployeeToProject } = require("../../middlewares/validators/admin/validator");
//import handlers
const { employeesHandler, employeeByIdHandler, deleteEmployeeByIdHandler, projectHandler, addEmployeeToProjectHandler } = require("./adminHandler");

//get all employees
adminApp.get("/employees", verifyToken, employeesHandler);

//get employee by id
adminApp.get("/employee/empId/:empId", verifyToken, validateEmployeeId, employeeByIdHandler);

//delete employee by id
adminApp.put("/employee/empId/:empId", verifyToken, validateEmployeeId, deleteEmployeeByIdHandler);

//create a project
adminApp.post("/project", verifyToken, validateProjectSchema, projectHandler);

//adds employee to a project
adminApp.post("/empId/:empId/projectId/:projectId", verifyToken, validateAddEmployeeToProject, validateAddingEmployeeToProject, addEmployeeToProjectHandler);

//exporting adminApp
module.exports = adminApp;

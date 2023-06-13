//import bcryptjs
const bcryptjs = require("bcryptjs");
//importing jwt
const jwt = require("jsonwebtoken");
//import sequelize
const sequelize=require("../database/db.config")

//importing models
const Employee = require("../database/models/employee.model"); 
const Address = require("../database/models/address.model");
const Attendance = require("../database/models/attendance.model");
const Timesheet = require("../database/models/timesheet.model");

//employee registration
const register = async (body) => {
  const t=await sequelize.transaction();
  try {
    //check if user already registered
    let employee = await Employee.findOne({ where: { email: body.email }, transaction: t });
    //if employee already registered
    if (employee) {
      return { message: "Employee already registered" };
    } else { 
      //if employee is not registered
      //create record for address
      const addressResponse = await Address.create(body.address, {transaction: t});
      //remove address from req.body
      delete body.address;
      //add addressId to req.body
      body.addressId = addressResponse.id; 
      //create record for employee
      await Employee.create(body,{transaction:t});
      await t.commit()
      return { message: "Employee registered successfully" };
    }
  } catch (error) {
    await t.rollback()
    throw error;
  }
};

//employee login
const login = async (body) => {
  const t=await sequelize.transaction();
  try {
    //check if the employee registered
    let employee = await Employee.findOne({ where: { email: body.email }, transaction: t, attributes:{
      exclude:["image","createdBy","updatedBy","createdAt","updatedAt","isActive"]
    } });
    //if employee email does not exist
    if (!employee) {
      return { message: "Invalid email" };
    } else { //if employee email exists
      //verify password
      let result = await bcryptjs.compare(body.password, employee.password);
      //if password is incorrect
      if (result === false) {
        return { message: "Invalid password" };
      } else { //if password is correct
        //create jwt token and send to client
        let signedToken = jwt.sign(
          { id: employee.id, email: employee.email, role: employee.role },
          process.env.SECRET_KEY || "",
          { expiresIn: "5h" }
        );
        //remove password
        delete employee.dataValues.password;
        await t.commit()
        //send jwt in response
        return {
          message: "Login successful",
          token: signedToken,
          user: employee,
        };
      }
    }
  } catch (error) {
    await t.rollback()
    throw error;
  }
};

//employees can update/edit their own details
const edit = async (req) => {
  const t=await sequelize.transaction();
  try {
    //get id from req.params
    let empId = req.params.empId;
    //get employee with that employee id
    let employee = await Employee.findOne({ where: { id: empId }, transaction:t });
    //if employee does not exist
    if (!employee) {
      return { message: "Employee not found" };
    }
    //if employee exists
    //update details for given email
    await Employee.update(req.body, { where: { id: empId }, transaction:t });
    await t.commit()
    return { message: "Details updated successfully" };
  } catch (error) {
    await t.rollback()
    throw error;
  }
};

//employee can clock in
const clockIn = async (req, res) => {
  const t=await sequelize.transaction();
  try{
  //add current time as clock in time to req.body
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //add date to req.body
  req.body.date = today;
  //add clock in time to req.body
  req.body.clockIn = time;
  //create record for clock in
  await Attendance.create(req.body, {transaction: t});
  await t.commit()
  return { message: "Clock in successful" };
}catch(error){
  await t.rollback()
  throw error
}
};

//employee can clock out
const clockOut = async (req) => {
  const t=await sequelize.transaction();
  try{
  //get empId from req.params
  let empId = req.params.empId;
  let employee = await Attendance.findOne({ where: { empId: empId }, transaction:t });
  //if employee does not exist with that id
  if (employee === null) {
    return { message: "employee does not exist" };
  } else {
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    await Attendance.update({ clockOut: time }, { where: { empId: empId }, transaction: t });
    await t.commit()
    return { message: "Clocked out successfully" };
  }
}catch(error){
  await t.rollback()
  throw error
}
};

//adding timesheet
const timesheet = async (req) => {
  const t=await sequelize.transaction();
  try{
  //get today's date
  var today = new Date();
  //add date to req.body
  req.body.date = today;
  //create record for timetable
  await Timesheet.create(req.body, {transaction: t});
  await t.commit()
  return { message: "Timesheetupdated" };
}catch(error){
  await t.rollback()
  throw error
}
};

//deleting timesheet
const deleteTimesheet = async (req) => {
  const t=await sequelize.transaction();
  try{
  //get timesheet from req.params
  let timesheetId = req.params.timesheetId;
  await Timesheet.destroy({ where: { id: timesheetId }, transaction:t });
  await t.commit()
  return { message: "timesheet deleted" };
}catch(error){
  await t.rollback()
  throw error
}
};

//export controllers
module.exports = { register, login, edit, clockIn, clockOut, timesheet, deleteTimesheet };
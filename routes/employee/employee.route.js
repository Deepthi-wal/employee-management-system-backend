//importing express
const exp = require("express");
//creating express mini application
const employeeApp = exp.Router();

//body parser
employeeApp.use(exp.json());

//import verify token
const verifyToken = require("../../middlewares/verifyToken.middleware");

//importing handlers
const {
  registerHandler,
  loginHandler,
  editHandler,
  clockInHandler,
  clockOutHandler,
  timesheetHandler,
  deleteTimesheetHandler,
} = require("./employeeHandler");

//importing validators
const {
  validateRegistration,
  validateLogin,
  validateEmployeeId,
  validateProfileUpdate,
  validateClockIn,
  validateTimesheetSchema,
  validateTimesheetId,
} = require("../../middlewares/validators/employee/validator");

//employee registration
employeeApp.post("/register", validateRegistration, registerHandler);

//employee login
employeeApp.post("/login", validateLogin, loginHandler);

//employee updates their own details
employeeApp.put(
  "/edit/empId/:empId",
  verifyToken,
  validateEmployeeId,
  validateProfileUpdate,
  editHandler
);

//employee can clock in
employeeApp.post("/clock-in/empId/:empId", verifyToken, validateEmployeeId, validateClockIn, clockInHandler);

//employee can clock out
employeeApp.put("/clock-out/empId/:empId", verifyToken, validateEmployeeId, clockOutHandler);

//employee can add timetable
employeeApp.post("/timesheet/empid/:empId", verifyToken, validateEmployeeId, validateTimesheetSchema, timesheetHandler);

//employee can delete timesheet
employeeApp.delete("/timesheet/timesheetId/:timesheetId", verifyToken, validateTimesheetId, deleteTimesheetHandler);

//exporting employeeApp
module.exports = employeeApp;

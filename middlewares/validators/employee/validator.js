//import joi
const Joi=require("joi");
//validator
const validator=(schema, payload)=>schema.validate(payload,{abortEarly:false});

//validators for req.body

//validator for registration
const registrationSchema=Joi.object({
    firstName:Joi.string().min(4).max(12).required(),
    lastName:Joi.string().min(4).max(12).required(),
    email:Joi.string().email().regex(/^[a-zA-Z0-9._]+@westagilelabs\.com$/).required(),
    password:Joi.string().min(4).max(15).required(),
    mobile:Joi.number().min(1000000000).max(9999999999).required(),
    isActive:Joi.boolean(),
    address:Joi.object({
      street:Joi.string().required(),
      city:Joi.string().required(),
      state:Joi.string().required(),
      pincode:Joi.number().min(0o0).max(999999).required()
    }),
    createdBy: Joi.number(),
    updatedBy: Joi.number()
})

//validator for login
const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(4).max(15).required()
})


//validator for clock in
const clockInSchema=Joi.object({
  comment:Joi.string().required(),
  empId:Joi.number().required(),
  createdBy:Joi.number().required(),
  updatedBy:Joi.number(),
  deletedAt:Joi.date(),
  deletedBy:Joi.number()
})

//validator for adding timesheet
const timesheetSchema=Joi.object({
  startTime:Joi.string().required(),
  endTime:Joi.string().required(),
  comments:Joi.string().required(),
  employeeProjectId:Joi.number().required(),
  createdBy:Joi.number().required(),
  updatedBy:Joi.number(),
  deletedBy:Joi.number(),
  deletedAt:Joi.date()
})

//validator employee details updation
const profileUpdateSchema=Joi.object({
  firstName:Joi.string().min(4).max(12),
  lastName:Joi.string().min(4).max(12),
  password:Joi.string().min(4).max(15),
  mobile:Joi.number().min(1000000000).max(9999999999),
  department:Joi.string().valid('development','testing','engineering','peopleAndCulture')
})


//validators for req.params

//validator for employee id in req.params
const EmployeeId=Joi.object({
  empId:Joi.number().required()
})


//validator for timesheet id in req.params
const timesheetId=Joi.object({
  timesheetId:Joi.number().required()
})


//export registrationSchema
exports.validateRegistration= (req,res,next)=>{
  //validate req.body
  const { error, value } = validator(registrationSchema,req.body)
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

//export loginSchema
exports.validateLogin=(req,res,next)=>{
  //validate req.body
  const { error, value } = validator(loginSchema,req.body);
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

//export employeeId
exports.validateEmployeeId=(req,res,next)=>{
  //validate req.params
  var { error, value } = validator(EmployeeId,req.params);
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

//export profileUpdateSchema
exports.validateProfileUpdate=(req,res,next)=>{
  //validate req.body
  var { error, value } = validator(profileUpdateSchema,req.body);
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

//export clockInSchema
exports.validateClockIn=(req,res,next)=>{
  //validate req.body
  var { error, value } = validator(clockInSchema, req.body);
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

//export timesheetSchema
exports.validateTimesheetSchema=(req,res,next)=>{
  //validate req.body
  var { error, value } = validator(timesheetSchema, req.body);
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

//export timesheetId
exports.validateTimesheetId=(req,res,next)=>{
  //validate req.params
  var { error, value } = validator(timesheetId, req.params);
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}
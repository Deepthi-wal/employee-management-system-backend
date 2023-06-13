//import joi
const Joi=require("joi");
//validator
const validator=(schema, payload)=>schema.validate(payload,{abortEarly:false});

//validator for employee id in req.params
const EmployeeId=Joi.object({
  empId:Joi.number().required()
})

//validator for project
const projectSchema=Joi.object({
  name:Joi.string().required(),
  managerId:Joi.number().required(),
  typeOfProject:Joi.string().valid('development','testing','devops','storage').required(),
  startDate:Joi.date().required(),
  endDate:Joi.date(),
  createdBy:Joi.number().required(),
  updatedBy:Joi.number(),
  deletedAt:Joi.date(),
  deletedBy:Joi.number()
})

//validator for admin adding employees to project for req.params
const addEmployeeToProject=Joi.object({
  empId:Joi.number().required(),
  projectId:Joi.number().required()
})

//validator for admin adding employee to project req.body
const addingEmployeeToProject=Joi.object({
  empId:Joi.number().required(),
  projectId:Joi.number().required(),
  isActive:Joi.boolean(),
  createdBy:Joi.number().required(),
  updatedBy:Joi.number(),
  department:Joi.string().valid('development','testing','engineering','peopleAndCulture','manager').required(),
  role:Joi.string().valid('Admin','manager','employee').required()
})


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

//export projectSchema
exports.validateProjectSchema=(req,res,next)=>{
  //validate req.body
  const { error, value } = validator(projectSchema,req.body)
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

//export addEmployeeToProject
exports.validateAddEmployeeToProject=(req,res,next)=>{
  //validate req.params
  const { error, value } = validator(addEmployeeToProject,req.params);
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

//export addingEmployeeToProject
exports.validateAddingEmployeeToProject=(req,res,next)=>{
  //validate req.params
  const { error, value } = validator(addingEmployeeToProject,req.body);
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  next()  
}
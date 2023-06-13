//import supertest
const request = require("supertest");
//import app from server
const app = require("../server");
const Employees = require("../database/models/employee.model");

afterAll(async()=>{
  await Employees.destroy({where:{email:"yamini@westagilelabs.com"}})
})
 
var token

//employee registration
test("Response should be employee registration successful", async()=>{
  const res=await request(app).post("/employee/register").send({
  "firstName":"Yamini",
  "lastName":"Setti", 
  "email":"yamini@westagilelabs.com",
  "password":"yamini",
  "mobile":9398886140,
  "address":{
    "street":"anjaiah nagar",
    "city":"Hyderabad",
    "state":"Telangana",
    "pincode":500085
  }
  })
  res.text=JSON.parse(res.text)
  expect(res.text.message).toBe("Employee registered successfully")
})


//registration for existing employee
test("Response should be employee already registered",async()=>{
  const res=await request(app).post("/employee/register").send({
  "firstName":"Yamini",
  "lastName":"Setti", 
  "email":"yamini@westagilelabs.com",
  "password":"yamini",
  "mobile":9398886140,
  "address":{
    "street":"anjaiah nagar",
    "city":"Hyderabad",
    "state":"Telangana",
    "pincode":500085
  }
  })
  res.text=JSON.parse(res.text)
  expect(res.text.message).toBe("Employee already registered")
})

//successful login
test("User should login successfully", async()=>{
  const res=await request(app).post("/employee/login").send({
  "email":"yamini@westagilelabs.com",
  "password":"yamini"
  })
  // console.log(res)
  res.text=JSON.parse(res.text)
  expect(res.text.message).toBe("Login successful")
  token=res.body.token
  console.log("token.....",token)
})

//Invalid email
test("Response should be invalid email", async()=>{
  const res= await request(app).post("/employee/login").send({
    "email":"yaminiii@gmail.com",
    "password":"yamini"
  })
  res.text=JSON.parse(res.text)
  expect(res.text.message).toBe("Invalid email")
})

//Invalid password
test("Response should be invalid password", async()=>{
  const res=await request(app).post("/employee/login").send({
    "email":"yamini@westagilelabs.com",
    "password":"yaminii"
  })
  // console.log(res)
  res.text=JSON.parse(res.text)
  expect(res.text.message).toBe("Invalid password")
})

//employee can edit their details
test("employee should edit their details successfully", async()=>{
  const res=await request(app).put("/employee/edit/empId/1").send({
    "firstName":"Srikar"
  })
  .set('Authorization', 'bearer ' + token)
  // console.log(res)
  res.text=JSON.parse(res.text)
  expect(res.text.message).toBe("Details updated successfully")
})

//update details
test("Response should be employee not found", async()=>{
  const res=await request(app).put("/employee/edit/empId/11111").send({
    "firstName":"Srikar"
  })
  .set('Authorization', 'bearer ' + token)
  // console.log(res)
  res.text=JSON.parse(res.text)
  expect(res.text.message).toBe("Employee not found")
})
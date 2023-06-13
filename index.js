//import app from server.js
const app=require("./server")

//configure .env
require("dotenv").config()

//creating port number
const PORT=process.env.PORT||4000

//assigning port number
app.listen(PORT,()=>{
  console.log(`server started at ${PORT}`)
})
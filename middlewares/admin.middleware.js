//import jsonweb token
const jwt=require("jsonwebtoken")
//import dotenv
const dotenv=require("dotenv")
//configure dotenv-makes process.env available
dotenv.config();

//verifying token
const verifyToken=(req,res,next)=>{
  //get bearer token from req.headers
  let bearerToken=req.headers.authorization;
  console.log(bearerToken)
  //check if bearer token exists
  //if bearer token does not exist
  if(bearerToken===undefined){
    res.status(401).send({message:"Unauthorised access"})
  }
  //if bearer token exists
  else{
    //get token
    const token=bearerToken.split(" ")[1] //[bearer token]
    try{
      //verify token
      const {role}=jwt.verify(token,process.env.SECRET_KEY)
      if(role==="Admin")
      {
        next()
      }
      else{
        res.status(401).send({message:"Only admin can access..."})
      }
    }catch(err){
      res.status(401).send({message:"please login to  continue..."})
    }
  }
}

module.exports=verifyToken
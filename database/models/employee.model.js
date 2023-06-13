// import sequelize from db.config
const sequelize = require("../db.config");
//import datatypes
const { DataTypes } = require("sequelize");
//import bcryptjs
const bcryptjs=require("bcryptjs");

const Attendance = require("./attendance.model");
const EmployeeProject = require("./employeeProject.model");
const Projects = require("./projects.model");
const Address = require("./address.model")

//create Employee model
const Employees=sequelize.define("Employees",{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,

    set(password){
      let newPassword=bcryptjs.hashSync(password,5)
      this.setDataValue('password',newPassword)
    }
  },
  mobile:{
    type: DataTypes.BIGINT,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  isActive:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  addressId:{
    type:DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: 'Address',
      key: 'id'
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updatedBy:{
    type: DataTypes.INTEGER,
    allowNull: true
  }
},{
  freezeTableName: true
})

//ASSOCIATIONS

//association between employee and address(one to one)
Employees.belongsTo(Address,{foreignKey:"addressId"})


//association between employee and attendance (one to many)
Employees.hasMany(Attendance, {
  foreignKey: "empId"
})

//association between employees and projects (many to many)
Employees.belongsToMany(Projects,{through: EmployeeProject, foreignKey: "empId"})
Projects.belongsToMany(Employees, {through: EmployeeProject, foreignKey: "projectId"})


module.exports=Employees
// import sequelize from db.configfrom sequelize
const sequelize = require("../db.config");
//import datatypes
const { DataTypes } = require("sequelize");
const Employee = require("./employee.model");
const Projects = require("./projects.model");
const Employees = require("./employee.model");
const Timesheet = require("./timesheet.model");

//create employeeProject model
const EmployeeProject=sequelize.define("EmployeeProject",{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  empId:{
    type:DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "Employees",
      key:"id"
    }
  },
  projectId:{
    type:DataTypes.INTEGER,
    allowNull: false,
    references:{
      model:Projects,
      key:"id"
    }
  },
  isActive:{
    type:DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updatedBy:{
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
},
{
  freezeTableName: true
})

//association between EmployeeProject and timesheet (one to many)
EmployeeProject.hasMany(Timesheet,{foreignKey: "employeeProjectId"})

module.exports=EmployeeProject
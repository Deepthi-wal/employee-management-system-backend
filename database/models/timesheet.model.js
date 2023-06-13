// import sequelize from db.configfrom sequelize
const sequelize = require("../db.config");
//import datatypes
const { DataTypes } = require("sequelize");
//import Employee model
// const Employee=require("./employee.model")

//create timesheet model
const Timesheet=sequelize.define("Timesheet",{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  startTime:{
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime:{
    type: DataTypes.TIME,
    allowNull: false
  },
  comments:{
    type: DataTypes.STRING,
    allowNull: false
  },
  employeeProjectId:{
    type:DataTypes.INTEGER,
    allowNull: false,
    references:{
      model:'EmployeeProject',
      key:'id'
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updatedBy:{
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  deletedAt:{
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  deletedBy:{
    type:DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
},{
  freezeTableName: true
})


module.exports=Timesheet
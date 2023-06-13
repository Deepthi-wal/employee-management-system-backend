// import sequelize from db.configfrom sequelize
const sequelize = require("../db.config");
//import datatypes
const { DataTypes } = require("sequelize");
const Employees = require("./employee.model");

//create attendance model
const Attendance=sequelize.define("Attendance",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  clockIn: {
    type: DataTypes.TIME,
    allowNull: false
  },
  clockOut: {
    type: DataTypes.TIME
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empId:{
    type:DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "Employees",
      key:"id"
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


module.exports=Attendance
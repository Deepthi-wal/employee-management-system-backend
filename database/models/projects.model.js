// import sequelize from db.configfrom sequelize
const sequelize = require("../db.config");
//import datatypes
const { DataTypes } = require("sequelize");
// const Employee = require("./employee.model");

//create projects model
const Projects=sequelize.define("Projects",{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  managerId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  typeOfProject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: { 
    type: DataTypes.DATE,
    allowNull: false
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


module.exports=Projects
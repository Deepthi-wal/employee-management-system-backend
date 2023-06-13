// import sequelize from db.configfrom sequelize
const sequelize = require("../db.config");
//import datatypes
const { DataTypes } = require("sequelize");
const Employee = require("./employee.model");

//create address model
const Address=sequelize.define("Address",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pincode: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  updatedBy:{
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
},{
  freezeTableName:true
})


module.exports=Address
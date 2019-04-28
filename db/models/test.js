'use strict';
const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Test = db.define('Test',{
  subject:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  grade:{
    type:Sequelize.INTEGER,
    allowNull:false,
    validate:{
      isNumeric:true,
    }
  }
});

Test.belongsTo(Student,{as:'student'});
module.exports = Test;

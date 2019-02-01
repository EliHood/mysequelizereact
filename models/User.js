'use strict';
var bcrypt = require('bcrypt');

const User = (sequelize, DataTypes) => {
  const myUser = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  myUser.associate = function(models) {
    // associations can be defined here
  };

  return myUser;
};

module.exports = User;
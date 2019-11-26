const Sequelize = require('sequelize');
const UserModel = require('../models/users')

const DB_NAME = 'ug';
const DB_USER = 'root';
const DB_PASS = '1234ng';

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);

User.sync({ force: true }).then(function () {
  console.log(`Database & tables created!`);
});

module.exports = { User };

// User
// name
// surname
// birthday (opt)
// identification
// email
// password
// phoneNumber (opt)

// id
// created_at
// updated_at
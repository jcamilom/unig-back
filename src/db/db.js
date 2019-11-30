const { Sequelize, Model, DataTypes } = require('sequelize');
const UserModel = require('../models/users')
const TeacherModel = require('../models/teacher');

const DB_NAME = 'ug';
const DB_USER = 'root';
const DB_PASS = '1234ng';

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

const User = UserModel(sequelize, Model, DataTypes);
const Teacher = TeacherModel(sequelize, Model, DataTypes);

Teacher.belongsTo(User);
// User.hasOne(Teacher);

sequelize.sync({ force: true }).then(function () {
  console.log(`Database & tables created!`);
  User.create(
    {
      "name": "Horacio",
      "surname": "Lopez",
      "identification": "123456789",
      "phoneNumber": "332-543-3333",
      "profilePicture": "http://mypic.com",
      "email": "horacio@mail.com",
      "password": "pass1234",
      "birthdate": "1979-03-18",
    }
  ).then((user) => {
    Teacher.create({
      employeeId: '12234',
      userId: user.id
    })
  })
});

module.exports = { User, Teacher };

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
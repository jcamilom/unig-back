const Sequelize = require('sequelize');

var sequelize = new Sequelize('ug', 'root', '1234ng', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  name: Sequelize.STRING,
  surname: Sequelize.STRING,
  birthday: Sequelize.DATE,
  identification: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  phoneNumber: Sequelize.STRING
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    name: 'Pedro',
    surname: 'Cuartas',
    birthday: new Date(1980, 5, 25),
    identification: '1234-9876',
    email: 'pedro@mail.com',
    password: '12345678',
    phoneNumber: '765-333'
  });
});

// User
// name
// surname
// birthday
// identification
// email
// password
// phoneNumber

// id
// created_at
// updated_at
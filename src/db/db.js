const Sequelize = require('sequelize');

var sequelize = new Sequelize('ug', 'root', '1234ng', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthday: Sequelize.DATE,
  phoneNumber: Sequelize.STRING,
  profilePicture: Sequelize.STRING,
  identification: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
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
// birthday (opt)
// identification
// email
// password
// phoneNumber (opt)

// id
// created_at
// updated_at
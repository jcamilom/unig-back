const bcrypt = require('bcryptjs');

module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z\s]+$/i,
        notEmpty: true,
        len: [3, 50]
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z\s]+$/i,
        notEmpty: true,
        len: [3, 50]
      }
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        is: /^[(]{0,1}[+]?[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i,
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    identification: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9\s-]+$/i,
        notEmpty: true,
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [3, 50]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 16]
      }
    },
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeValidate: (user) => {
        if (typeof user.name === 'string') user.name = user.name.trim();
        if (typeof user.surname === 'string') user.surname = user.surname.trim();
        if (typeof user.identification === 'string') user.identification = user.identification.trim();
        if (typeof user.email === 'string') user.email = user.email.trim().toLowerCase();
        if (typeof user.phoneNumber === 'string') user.phoneNumber = user.phoneNumber.trim();
        if (typeof user.profilePicture === 'string') user.profilePicture = user.profilePicture.trim();
      },
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 8);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      }
    }
  });
  return User;
}

// User
// name: trim - letters, !'', len(3, 50)
// surname: trim - letters, !'', len(3, 50)
// birthday (opt) trim - date
// identification: trim - letters, numbers, "-", " ", !'', len(1, 50)
// email: trim - vald email, len(3, 50)
// password: len(8-16)
// phoneNumber (opt): trim - numbers, "-", " ", !'', len(1, 50)
// profilePicture (opt): trim - url

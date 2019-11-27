module.exports = (sequelize, types) => {
  const User = sequelize.define('user', {
    name: {
      type: types.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z\s]+$/i,
        notEmpty: true,
        len: [3, 50]
      }
    },
    surname: {
      type: types.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z\s]+$/i,
        notEmpty: true,
        len: [3, 50]
      }
    },
    birthdate: {
      type: types.DATEONLY,
      validate: {
        isDate: true
      }
    },
    phoneNumber: {
      type: types.STRING,
      validate: {
        is: /^[(]{0,1}[+]?[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i,
      }
    },
    profilePicture: {
      type: types.STRING,
      validate: {
        isUrl: true
      }
    },
    identification: {
      type: types.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9\s-]+$/i,
        notEmpty: true,
        len: [1, 50]
      }
    },
    email: {
      type: types.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [3, 50]
      }
    },
    password: {
      type: types.STRING,
      allowNull: false,
      validate: {
        len: [8, 16]
      }
    },
  }, {
    hooks: {
      beforeValidate: (user, options) => {
        if (typeof user.name === 'string') user.name = user.name.trim();
        if (typeof user.surname === 'string') user.surname = user.surname.trim();
        if (typeof user.identification === 'string') user.identification = user.identification.trim();
        if (typeof user.email === 'string') user.email = user.email.trim().toLowerCase();
        if (typeof user.phoneNumber === 'string') user.phoneNumber = user.phoneNumber.trim();
        if (typeof user.profilePicture === 'string') user.profilePicture = user.profilePicture.trim();
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

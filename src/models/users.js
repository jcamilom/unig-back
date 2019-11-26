module.exports = (sequelize, types) => {
  const User = sequelize.define('user', {
    name: {
      type: types.STRING,
      allowNull: false
    },
    surname: {
      type: types.STRING,
      allowNull: false
    },
    birthday: types.DATE,
    phoneNumber: types.STRING,
    profilePicture: types.STRING,
    identification: {
      type: types.STRING,
      allowNull: false
    },
    email: {
      type: types.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: types.STRING,
      allowNull: false
    },
  });
  return User;
}

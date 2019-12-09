module.exports = (sequelize, Model, DataTypes) => {
  class Role extends Model { }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: true,
        notEmpty: true,
        len: [1, 20]
      }
    },
  }, {
    sequelize,
    modelName: 'role',
    hooks: {
      beforeValidate: (role) => {
        if (typeof role.name === 'string') role.name = role.name.trim();
      },
    }
  });
  return Role;
}

module.exports = (sequelize, Model, DataTypes) => {
  class Project extends Model { }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-ZÀ-ÿ0-9\s]+$/i,
        notEmpty: true,
        len: [1, 70]
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'project',
    hooks: {
      beforeValidate: (project) => {
        if (typeof project.name === 'string') project.name = project.name.trim();
      },
    }
  });
  return Project;
}

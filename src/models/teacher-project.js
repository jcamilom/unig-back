module.exports = (sequelize, Model, DataTypes) => {
  class TeacherProject extends Model { }
  TeacherProject.init({
    role: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: 'investigador pricipal'
    }
  }, {
    sequelize,
    modelName: 'teacher_project'
  })
  return TeacherProject;
}
module.exports = (sequelize, Model, DataTypes) => {
  class TeacherProject extends Model { }
  TeacherProject.init({}, {
    sequelize,
    modelName: 'teacher_project'
  })
  return TeacherProject;
}
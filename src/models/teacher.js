module.exports = (sequelize, Model, DataTypes) => {
  class Teacher extends Model {}
  Teacher.init({
    employeeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teacher'
  });
  return Teacher;
}
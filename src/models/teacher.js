module.exports = (sequelize, Model, DataTypes) => {
  class Teacher extends Model {}
  Teacher.init({
    userId: {
      type: DataTypes.INTEGER,
      unique:true
   }
  }, {
    sequelize,
    modelName: 'teacher'
  });
  return Teacher;
}
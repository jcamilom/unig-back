module.exports = (sequelize, Model, DataTypes) => {
  class ResourceRole extends Model { }
  ResourceRole.init({}, {
    sequelize,
    modelName: 'resource_role'
  })
  return ResourceRole;
}

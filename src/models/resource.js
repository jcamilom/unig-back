module.exports = (sequelize, Model, DataTypes) => {
  class Resource extends Model { }
  Resource.init({
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['GET', 'POST', 'PUT', 'PATCH', 'DELETE']],
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['path', 'method']
      }
    ],
    sequelize,
    modelName: 'resource',
    hooks: {
      beforeValidate: (resource) => {
        if (typeof resource.path === 'string') resource.path = resource.path.trim();
        if (typeof resource.method === 'string') resource.method = resource.method.trim();
      },
    }
  });
  return Resource;
}

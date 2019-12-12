const { Sequelize, Model, DataTypes } = require('sequelize');
const UserModel = require('../models/users')
const TeacherModel = require('../models/teacher');
const ProjectModel = require('../models/project');
const TeacherProjectModel = require('../models/teacher-project');
const RoleModel = require('../models/role');
const ResourceModel = require('../models/resource');
const ResourceRoleModel = require('../models/resource-role');

const init = require('./init');

const { dbHost, dbName, dbUser, dbPass } = require('../config/config'); 

var sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
});

const Role = RoleModel(sequelize, Model, DataTypes);
const User = UserModel(sequelize, Model, DataTypes);
const Teacher = TeacherModel(sequelize, Model, DataTypes);
const Project = ProjectModel(sequelize, Model, DataTypes);
const TeacherProject = TeacherProjectModel(sequelize, Model, DataTypes);
const Resource = ResourceModel(sequelize, Model, DataTypes);
const ResourceRole = ResourceRoleModel(sequelize, Model, DataTypes);

User.hasOne(Teacher, { foreingKey: 'userId', sourceKey: 'id' });
Teacher.belongsTo(User);

Resource.belongsToMany(Role, { through: ResourceRole });
Role.belongsToMany(Resource, { through: ResourceRole });

Role.belongsToMany(User, { through: 'user_roles' });
User.belongsToMany(Role, { through: 'user_roles' });

Teacher.belongsToMany(Project, { through: TeacherProject });
Project.belongsToMany(Teacher, { through: TeacherProject });

init(sequelize, User, Teacher, Project, TeacherProject, Role, Resource, ResourceRole);

module.exports = {
  User,
  Teacher,
  Project,
  TeacherProject,
  Role,
  Resource,
  ResourceRole
};

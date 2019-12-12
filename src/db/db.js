const { Sequelize, Model, DataTypes } = require('sequelize');
const UserModel = require('../models/users')
const TeacherModel = require('../models/teacher');
const ProjectModel = require('../models/project');
const TeacherProjectModel = require('../models/teacher-project');
const RoleModel = require('../models/role');
const ResourceModel = require('../models/resource');
const ResourceRoleModel = require('../models/resource-role');

const DB_NAME = 'ug';
const DB_USER = 'root';
const DB_PASS = '1234ng';

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: 'localhost',
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

sequelize.sync({ force: true }).then(async function () {
  console.log("=========== SETUP INIT ============");
  console.log("========== Database & tables created! ===========");
  console.log("========== Roles creation ===========")
  const teacherRole = await Role.create({
    name: 'teacher'
  });
  console.log(`---> teacher role inserted!`);
  const adminRole = await Role.create({
    name: 'admin'
  });
  console.log(`---> admin role inserted!`);
  console.log("========== Users creation ===========")
  const teacher = await Teacher.create({
    user: {
      name: "Horacio",
      surname: "Lopez",
      identification: "123456789",
      phoneNumber: "332-543-3333",
      profilePicture: "http://mypic.com",
      email: "horacio@mail.com",
      password: "pass1234",
      birthdate: "1979-03-18",
    }
  }, { include: User });
  console.log(`---> Test teacher inserted!`);
  const user = await User.create({
    name: "Juan",
    surname: "Ramirez",
    identification: "11112222",
    phoneNumber: "332-543-3333",
    profilePicture: "http://mypic.com",
    email: "juan@mail.com",
    password: "pass1234",
    birthdate: "1979-03-18",
  });
  console.log('---> Test user created!');
  console.log("=========== Adding roles to users ============");
  await teacher.user.addRole(teacherRole);
  console.log("---> added teacher role to test teacher");
  await user.addRole(adminRole);
  console.log("---> added admin role to test user");
  console.log("=========== Project creation ============");
  await Project.create({
    name: 'Programacion orientada a objetos',
    status: true
  });
  console.log(`---> Test project inserted!`);
  console.log("=========== Resources creation ============");
  await Resource.bulkCreate([
    { path: '/projects/:id', method: 'GET' },
    { path: '/projects', method: 'GET' },
    { path: '/projects', method: 'POST' }
  ]);
  console.log(`---> Test resources inserted!`);
  console.log("=========== Resources - Roles associations ============");
  await ResourceRole.bulkCreate([
    {
      roleId: teacherRole.id,
      resourceId: 1
    },
    {
      roleId: teacherRole.id,
      resourceId: 2
    }
  ]);
  console.log(`---> Test role-resources association inserted!`);
  console.log("=========== SETUP COMPLETED ============");
});

module.exports = {
  User,
  Teacher,
  Project,
  TeacherProject,
  Role,
  Resource,
  ResourceRole
};

// User
// name
// surname
// birthday (opt)
// identification
// email
// password
// phoneNumber (opt)

// id
// created_at
// updated_at
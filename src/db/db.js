const { Sequelize, Model, DataTypes } = require('sequelize');
const UserModel = require('../models/users')
const TeacherModel = require('../models/teacher');
const ProjectModel = require('../models/project');
const TeacherProjectModel = require('../models/teacher-project');
const RoleModel = require('../models/role');

const DB_NAME = 'ug';
const DB_USER = 'root';
const DB_PASS = '1234ng';

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

const Role = RoleModel(sequelize, Model, DataTypes);
const User = UserModel(sequelize, Model, DataTypes, Role);
const Teacher = TeacherModel(sequelize, Model, DataTypes);
const Project = ProjectModel(sequelize, Model, DataTypes);
const TeacherProject = TeacherProjectModel(sequelize, Model, DataTypes);

User.hasOne(Teacher, { foreingKey: 'userId', sourceKey: 'id' });
Teacher.belongsTo(User);

Teacher.belongsToMany(Project, { through: TeacherProject });
Project.belongsToMany(Teacher, { through: TeacherProject });

sequelize.sync({ force: true }).then(async function () {
  console.log(`Database & tables created!`);
  const teacherRole = await Role.create({
    name: 'teacher'
  });
  const adminRole = await Role.create({
    name: 'admin'
  });
  await Teacher.create({
    user: {
      name: "Horacio",
      surname: "Lopez",
      identification: "123456789",
      phoneNumber: "332-543-3333",
      profilePicture: "http://mypic.com",
      email: "horacio@mail.com",
      password: "pass1234",
      birthdate: "1979-03-18",
      roleId: teacherRole.id
    }
  }, { include: User });
  console.log(`Test teacher inserted!`);
  await User.create({
    name: "Juan",
    surname: "Ramirez",
    identification: "11112222",
    phoneNumber: "332-543-3333",
    profilePicture: "http://mypic.com",
    email: "juan@mail.com",
    password: "pass1234",
    birthdate: "1979-03-18",
    roleId: adminRole.id
  });
  console.log(`Test admin user inserted!`);
  await Project.create({
    name: 'Programacion orientada a objetos',
    status: true
  });
});

module.exports = {
  User,
  Teacher,
  Project,
  TeacherProject,
  Role
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
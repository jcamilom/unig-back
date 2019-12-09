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

const User = UserModel(sequelize, Model, DataTypes);
const Teacher = TeacherModel(sequelize, Model, DataTypes);
const Project = ProjectModel(sequelize, Model, DataTypes);
const TeacherProject = TeacherProjectModel(sequelize, Model, DataTypes);
const Role = RoleModel(sequelize, Model, DataTypes);

User.hasOne(Teacher, { foreingKey: 'userId', sourceKey: 'id' });
Teacher.belongsTo(User);

Teacher.belongsToMany(Project, { through: TeacherProject });
Project.belongsToMany(Teacher, { through: TeacherProject });

sequelize.sync({ force: true }).then(async function () {
  console.log(`Database & tables created!`);
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
      type: 'teacher'
    }
  }, { include: User });
  console.log(`Test teacher inserted!`);
  await Project.create({
    name: 'Programacion orientada a objetos',
    status: true
  });
  await Role.create({
    name: 'teacher'
  });
});

module.exports = { User, Teacher, Project, TeacherProject };

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
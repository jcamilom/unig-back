const { nodeEnv } = require('../config/config');

async function init(sequelize, User, Teacher, Project, TeacherProject, Role, Resource, ResourceRole) {
  console.log("=========== SETUP INIT ============");
  const isDev = nodeEnv === 'development';
  sequelize.sync({ force: isDev }).then(async function () {
    console.log("========== Database models synced! ===========");
    if (isDev) {
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
      })
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
    }
  });
}

module.exports = init;
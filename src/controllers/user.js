const bcrypt = require('bcryptjs');
const { User, Teacher } = require('../db/db');
const { ErrorBadRequest, ErrorNotFound } = require('../common/custom-errors');

class UserController {

  async create(data) {
    let user;
    switch (data.type) {
      case 'teacher':
        const teacher = {
          employeeId: data.employeeId,
          user: { ...data }
        };
        user = await Teacher.create(teacher, {
          include: User
        });
        break;
      case 'user':
        user = await User.create(data);
        break;
      default:
        throw new ErrorBadRequest(`User of type ${data.type} is not supported`);
    }
    return await user;
  }

  async login(email, password) {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new ErrorNotFound('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorNotFound('Invalid credentials');
    }
    return user;
  }

}

module.exports = UserController;
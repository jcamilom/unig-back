const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Teacher } = require('../db/db');
const { ErrorBadRequest, ErrorNotFound } = require('../common/custom-errors');

class UserController {

  async create(data) {
    try {
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
      return await this.generateToken(user);
    } catch (e) {
      if (e.name === 'SequelizeValidationError') {
        throw new ErrorBadRequest(e.message);
      } else if (e.name === 'SequelizeUniqueConstraintError') {
        throw new ErrorBadRequest('Email is already being used');
      }
      throw e;
    }
  }

  async login(email, password) {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new ErrorNotFound('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorNotFound('Invalid credentials');
    }
    return await this.generateToken(user);
  }

  async generateToken(user) {
    const token = jwt.sign({ id: user.id.toString() }, 'my-secret-key', { expiresIn: 600 });
    await User.update({ token }, {
      where: {
        id: user.id
      }
    });
    return { user, token };
  }

  async authenticate(token) {
    try {
      const decoded = jwt.verify(token, 'my-sectret-key');
      const user = await User.findOne({
        where: {
          id: decoded.id,
          token
        }
      });

      if (!user) {
        throw new ErrorUnauthorized();
      }
      return user;
    } catch (e) {
      if (e.name === 'JsonWebTokenError' && e.message === 'invalid signature') {
        throw new ErrorUnauthorized('jwt invalid signature')
      }
      throw e
    }
  }
  
  async update(id, updates) {
    const allowedUpdates = ['name', 'surname', 'identification', 'birthdate', 'phoneNumber', 'profilePicture', 'email', 'password'];
    const updatesKeys = Object.keys(updates);
    const isValidOperation = updatesKeys.every((updateKey) => allowedUpdates.includes(updateKey));

    try {
      if (!isValidOperation) {
        throw new ErrorBadRequest('Invalid update!');
      }
      const user = await User.findByPk(id);

      if (!user) {
        throw new ErrorNotFound('User does not exist');
      }
      await User.update(updates, {
        where: {
          id
        },
        individualHooks: true
      });
    } catch (e) {
      if (e.name === 'SequelizeValidationError') {
        throw new ErrorBadRequest(e.message);
      } else if (e.name === 'SequelizeUniqueConstraintError') {
        throw new ErrorBadRequest('Email is already being used');
      }
      throw e;
    }
  }

  async delete(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new ErrorNotFound('User does not exist');
    }
    await User.destroy({
      where: {
        id: user.id
      }
    });
  }

  async getAll() {
    return await User.findAll();
  }

}

module.exports = UserController;
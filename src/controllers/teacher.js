const { User, Teacher } = require('../db/db');
const { ErrorBadRequest, ErrorNotFound, ErrorUnauthorized } = require('../common/custom-errors');

class TeacherController {

  async getAll() {
    return await Teacher.findAll({
      include: [{
        model: User
      }]
    });
  }

}

module.exports = TeacherController;
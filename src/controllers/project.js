const { Project } = require('../db/db');
const { ErrorBadRequest, ErrorNotFound, ErrorUnauthorized } = require('../common/custom-errors');

class ProjectController {

  async create(project) {
    try {
      const proj = Project.create(project);
      return proj;
    } catch (e) {
      if (e.name == 'SequelizeUniqueConstraintError') {
        throw new ErrorBadRequest('Project name is already being used');
      } else if (e.name === 'SequelizeValidationError') {
        throw new ErrorBadRequest(e.message);
      }
      throw e;
    }
  }

  async getAll() {
    return await Project.findAll();
  }

}

module.exports = ProjectController;
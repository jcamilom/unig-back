const { Project } = require('../db/db');
const { ErrorBadRequest, ErrorNotFound, ErrorUnauthorized } = require('../common/custom-errors');

class ProjectController {

  async getAll() {
    return await Project.findAll();
  }

}

module.exports = ProjectController;
const { Project, TeacherProject, Teacher } = require('../db/db');
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

  async get(projectId) {
    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new ErrorNotFound(`Project with id '${projectId}' does not exist`);
    }

    return project;
  }

  async update(id, updates) {
    const allowedUpdates = ['name', 'status'];
    const updatesKeys = Object.keys(updates);
    const isValidOperation = updatesKeys.every((updateKey) => allowedUpdates.includes(updateKey));

    if (!isValidOperation) {
      throw new ErrorBadRequest('Invalid updates!');
    }

    const project = await Project.findByPk(id);

    if (!project) {
      throw new ErrorNotFound(`Project with id '${id}' does not exist`);
    }

    try {
      await Project.update(updates, {
        where: {
          id
        },
        individualHooks: true
      });
      return await project;
    } catch (e) {
      if (e.name == 'SequelizeUniqueConstraintError') {
        throw new ErrorBadRequest('Project name is already being used');
      } else if (e.name === 'SequelizeValidationError') {
        throw new ErrorBadRequest(e.message);
      }
      throw e;
    }
  }

  async delete(id) {
    const project = await Project.findByPk(id)

    if (!project) {
      throw new ErrorNotFound(`Project with id '${id}' does not exist`);
    }
    await Project.destroy({
      where: {
        id: project.id
      }
    });
  }

  async getTeachers(projectId) {
    const project = await Project.findByPk(projectId)

    if (!project) {
      throw new ErrorNotFound(`Project with id '${projectId}' does not exist`);
    }

    const teachers = await TeacherProject.findAll({
      where: {
        projectId
      }
    });
    return teachers
  }

  async updateTeachers(projectId, teachersId, type) {
    try {
      const project = await Project.findByPk(projectId)

      if (!project) {
        throw new ErrorNotFound(`Project with id '${projectId}' does not exist`);
      }

      if (type === 'add') {
        const newRecords = [];
        teachersId.forEach(teacherId => {
          newRecords.push({
            teacherId,
            projectId
          });
        });
        await TeacherProject.bulkCreate(newRecords);
      } else if (type == 'remove') {
        teachersId.forEach(async (teacherId) => {
          await TeacherProject.destroy({
            where: {
              teacherId,
              projectId
            }
          });
        });
      } else {
        throw new ErrorBadRequest(`update type '${type}' not supported`);
      }
    } catch (e) {
      if (e.name === 'SequelizeForeignKeyConstraintError') {
        throw new ErrorBadRequest('One of the users does not exist');
      } else if (e.name === 'SequelizeUniqueConstraintError') {
        throw new ErrorBadRequest('One of the relations already exists');
      }
      throw e
    }
  }

  async getAll() {
    return await Project.findAll();
  }

}

module.exports = ProjectController;
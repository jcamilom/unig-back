const express = require('express');
const ProjectController = require('../controllers/project');
const auth = require('../middleware/auth');

const router = new express.Router();

const projectController = new ProjectController();

// GET ALL
router.get('/projects', async (req, resp) => {
  try {
    const projects = await projectController.getAll();
    resp.send(projects);
  } catch (e) {
    handleError(e, resp);
  }
});

function handleError(e, resp) {
  if (e.statusCode) {
    return resp.status(e.statusCode).send({ error: e.message });
  }
  resp.status(500).send();
}

module.exports = router;
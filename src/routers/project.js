const express = require('express');
const ProjectController = require('../controllers/project');
const auth = require('../middleware/auth');

const router = new express.Router();

const projectController = new ProjectController();

// CREATE PROJECT
router.post('/projects', auth, async (req, resp) => {
  try {
    const project = await projectController.create(req.body);
    resp.status(201).send(project);
  } catch (e) {
    handleError(e, resp);
  }
});

// GET
router.get('/projects/:id', auth, async (req, resp) => {
  try {
    const project = await projectController.get(req.params.id);
    resp.send(project);
  } catch (e) {
    handleError(e, resp);
  }
});

// UPDATE
router.patch('/projects/:id', auth, async (req, resp) => {
  try {
    await projectController.update(req.params.id, req.body);
    resp.send();
  } catch (e) {
    handleError(e, resp);
  }
});

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
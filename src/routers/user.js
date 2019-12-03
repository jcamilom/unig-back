const express = require('express');
const UserController = require('../controllers/user');

const router = new express.Router();

const userController = new UserController();

// LOGIN
router.post('/login', async (req, resp) => {
  try {
    const data = await userController.login(req.body.email, req.body.password);
    resp.send(data);
  } catch (e) {
    handleError(e, resp);
  }
});

// REGISTER
router.post('/users', async (req, resp) => {
  try {
    const data = await userController.create(req.body);
    resp.status(201).send(data);
  } catch (e) {
    handleError(e, resp);
  }
});

// UPDATE
router.patch('/users/:id', async (req, resp) => {
  try {
    const user = await userController.update(req.params.id, req.body);
    resp.send(user);
  } catch (e) {
    handleError(e, resp);
  }
});

// DELETE
router.delete('/users/:id', async (req, resp) => {
  try {
    await userController.delete(req.params.id);
    resp.send();
  } catch (e) {
    handleError(e, resp);
  }
});

// GET ALL
router.get('/users', async (req, resp) => {
  try {
    const users = await userController.getAll();
    resp.send(users);
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
const express = require('express');
const { User } = require('../db/db');
const UserController = require('../controllers/user');
const { ErrorBadRequest, ErrorNotFound } = require('../common/custom-errors');

const router = new express.Router();

const userController = new UserController();

router.post('/login', async (req, resp) => {
  try {
    const user = await userController.login(req.body.email, req.body.password);
    resp.send(user);
  } catch (e) {
    handleError(e, resp);
  }
});

router.post('/users', async (req, resp) => {
  try {
    const user = await userController.create(req.body);
    resp.status(201).send(user);
  } catch (e) {
    handleError(e, resp);
  }
});

router.patch('/users/:id', async (req, resp) => {
  const allowedUpdates = ['name', 'surname', 'identification', 'birthdate', 'phoneNumber', 'profilePicture', 'email', 'password'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  
  try {
    if (!isValidOperation) {
      throw new ErrorBadRequest('Invalid update!');
    }
    const user = await User.findByPk(req.params.id);

    if (!user) {
      throw new ErrorNotFound('User does not exist');
    }
    await User.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    });
    resp.send();
  } catch (e) {
    if (e.statusCode) {
      return resp.status(e.statusCode).send({ error: e.message }); 
    } else if (e.name === 'SequelizeValidationError') {
      return resp.status(400).send({ error: e.message });
    } else if (e.name === 'SequelizeUniqueConstraintError') {
      return resp.status(400).send({ error: 'Email is already being used' });
    }
    resp.status(500).send();
  }
});

router.delete('/users/:id', async (req, resp) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      throw new ErrorNotFound('User does not exist');
    }
    await User.destroy({
      where: {
        id: user.id
      }
    })
    resp.send();
  } catch (e) {
    if (e.statusCode) {
      return resp.status(e.statusCode).send({ error: e.message }); 
    }
    resp.status(500).send();
  }
});

router.get('/users', async (req, resp) => {
  try {
    const users = await User.findAll();
    resp.send(users);
  } catch (e) {
    resp.status(500).send();
  }
});

function handleError(e, resp) {
  if (e.statusCode) {
    return resp.status(e.statusCode).send({ error: e.message }); 
  } else if (e.name === 'SequelizeValidationError') {
    return resp.status(400).send({ error: e.message });
  } else if (e.name === 'SequelizeUniqueConstraintError') {
    return resp.status(400).send({ error: 'Email is already being used' });
  }
  resp.status(500).send();
}

module.exports = router;
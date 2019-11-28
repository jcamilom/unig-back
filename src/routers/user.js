const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../db/db');

const router = new express.Router();

router.post('/login', async (req, resp) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return resp.status(404).send({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return resp.status(404).send({ error: 'Invalid credentials' });
    }

    resp.send(user);
  } catch (e) {
    resp.status(500).send();
  }
});

router.post('/users', async (req, resp) => {
  try {
    const user = await User.create(req.body);
    resp.status(201).send(user);
  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      return resp.status(400).send({ error: e.message });
    }
    resp.status(500).send();
  }
});

router.patch('/users/:id', async (req, resp) => {
  const allowedUpdates = ['name', 'surname', 'identification', 'birthdate', 'phoneNumber', 'profilePicture', 'email', 'password'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return resp.status(400).send({ error: 'Invalid update!' });
  }
  
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return resp.status(404).send({ error: 'User does not exist' });
    }
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    resp.send();
  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
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
      return resp.status(404).send({ error: 'User does not exist' });
    }
    await User.destroy({
      where: {
        id: user.id
      }
    })
    resp.send();
  } catch (e) {
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

module.exports = router;
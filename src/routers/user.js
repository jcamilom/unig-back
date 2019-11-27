const express = require('express');
const { User } = require('../db/db');

const router = new express.Router();

router.post('/login', async (req, resp) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });

    if (!user) {
      return resp.status(404).send();
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
      return resp.status(400).send(e.message);
    }
    resp.status(500).send();
  }
});

router.patch('/users/:id', async (req, resp) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return resp.status(404).send();
    }
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    resp.send();
  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      return resp.status(400).send(e.message);
    } else if (e.name === 'SequelizeUniqueConstraintError') {
      return resp.status(400).send('Email is already being used');
    }
    console.log(e.name)
    console.log(e.message)
    resp.status(500).send();
  }
});

router.delete('/users/:id', async (req, resp) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return resp.status(404).send();
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
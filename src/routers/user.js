const express = require('express');
const bcrypt = require('bcryptjs');
const { User, Teacher } = require('../db/db');
const { ErrorBadRequest, ErrorNotFound } = require('../common/custom-errors');

const router = new express.Router();

router.post('/login', async (req, resp) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      throw new ErrorNotFound('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new ErrorNotFound('Invalid credentials');
    }

    resp.send(user);
  } catch (e) {
    if (e.statusCode) {
      return resp.status(e.statusCode).send({ error: e.message }); 
    }
    resp.status(500).send();
  }
});

router.post('/users', async (req, resp) => {
  try {
    let user;
    switch (req.body.type) {
      case 'teacher':
        const teacher = {
          employeeId: req.body.employeeId,
          user: { ...req.body }
        };
        user = await Teacher.create(teacher, {
          include: User
        });
        break;
      case 'user':
        user = await User.create(req.body);
        break;
      default:
        throw new ErrorBadRequest(`User of type ${req.body.type} is not supported`);
    }
    resp.status(201).send(user);
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

module.exports = router;
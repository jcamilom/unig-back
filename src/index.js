const express = require('express');

const { User } = require('./db/db');

const app = express();
const port = 3000;

app.use(express.json())

app.post('/login', async (req, resp) => {
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

app.post('/users', async (req, resp) => {
  try {
    const user = await User.create(req.body);
    resp.status(201).send(user);
  } catch (e) {
    resp.status(500).send();
  }
});

app.patch('/users/:id', async (req, resp) => {
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
    resp.status(500).send();
  }
});

app.delete('/users/:id', async (req, resp) => {
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

app.get('/users', async (req, resp) => {
  try {
    const users = await User.findAll();
    resp.send(users);
  } catch (e) {
    resp.status(500).send();
  }
});

app.listen(port, () => {
  console.log('app running');
});

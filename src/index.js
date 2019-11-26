const express = require('express');

const { User } = require('./db/db');

const app = express();
const port = 3000;

app.use(express.json())

app.post('/login', (req, resp) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function (user) {
    if (!user) {
      return resp.status(404).send()
    }
    resp.send(user);
  }).catch(e => {
    resp.status(500).send();
  });
});

app.post('/users', (req, resp) => {
  try {
    const birthday = req.body.birthday.split('/');
    req.body.birthday = new Date(+birthday[0], +birthday[1] - 1, +birthday[2])
  } catch (e) {
    resp.status(400).send();
  }
  User.create(req.body).then(user => {
    resp.status(201).send(user);
  }).catch(e => {
    resp.status(500).send();
  });
});

app.patch('/users/:id', (req, resp) => {
  User.findByPk(req.params.id).then((user) => {
    if (!user) {
      return resp.status(404).send();
    }
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(() => {
      resp.send();
    }).catch(e => {
      resp.status(500).send();
    });
  });
});

app.delete('/users/:id', (req, resp) => {
  User.findByPk(req.params.id).then((user) => {
    if (!user) {
      return resp.status(404).send()
    }
    User.destroy({
      where: {
        id: user.id
      }
    }).then((user) => {
      resp.send()
    }).catch(e => {
      resp.status(500).send();
    })
  });
});

app.listen(port, () => {
  console.log('app running');
});

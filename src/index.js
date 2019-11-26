const express = require('express');

const { User } = require('./db/db');

const app = express();
const port = 3000;

app.use(express.json())

app.post('/login', (req, resp) => resp.send());
app.post('/users', (req, resp) => {
  const birthday = req.body.birthday.split('/');
  req.body.birthday = new Date(+birthday[0], +birthday[1] - 1, +birthday[2])
  User.create(req.body).then(user => {
    resp.status(201).send(user);
  });
});
app.put('/users', () => console.log('update'));
app.delete('/users', () => console.log('delete'));

app.listen(port, () => {
  console.log('app running');
});

const express = require('express');

const { User } = require('./db/db');

const app = express();
const port = 3000;

app.use(express.json())

app.post('/login', (req, resp) => resp.send());
app.post('/users', (req, resp) => {
  const birthday = req.body.birthday.split('/');
  User.create({
    name: 'Pedro',
    surname: 'Cuartas',
    birthday: new Date(+birthday[0], +birthday[1] - 1, +birthday[2]),
    identification: '123456789',
    phoneNumber: '332-543-3333',
    profilePicture: 'http://1234',
    email: 'pedro@mail.com',
    password: 'pass1234'
  }).then(user => {
    resp.json(user);
  });
});
app.put('/users', () => console.log('update'));
app.delete('/users', () => console.log('delete'));

app.listen(port, () => {
  console.log('app running');
});

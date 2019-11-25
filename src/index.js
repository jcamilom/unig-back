const express = require('express');

const app = express();
const port = 3000;

app.use(express.json())

app.post('/login', (req, resp) => resp.send());
app.post('/users', () => console.log('register'));
app.put('/users', () => console.log('update'));
app.delete('/users', () => console.log('delete'));

app.listen(port, () => {
  console.log('app running');
});
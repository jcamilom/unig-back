const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const teacherRouter = require('./routers/teacher');
const projectRouter = require('./routers/project');

const { port } = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json())
app.use(userRouter);
app.use(teacherRouter);
app.use(projectRouter);

app.listen(port, () => {
  console.log('app running');
});

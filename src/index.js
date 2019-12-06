const express = require('express');
const userRouter = require('./routers/user');
const teacherRouter = require('./routers/teacher');
const projectRouter = require('./routers/project');

const app = express();
const port = 3000;

app.use(express.json())
app.use(userRouter);
app.use(teacherRouter);
app.use(projectRouter);

app.listen(port, () => {
  console.log('app running');
});

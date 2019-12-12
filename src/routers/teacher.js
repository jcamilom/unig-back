const express = require('express');
const TeacherController = require('../controllers/teacher');
const auth = require('../middleware/auth');

const router = new express.Router();

const teacherController = new TeacherController();

// GET ALL
router.get('/teachers', auth, async (req, resp) => {
  try {
    const teachers = await teacherController.getAll();
    resp.send(teachers);
  } catch (e) {
    handleError(e, resp);
  }
});

function handleError(e, resp) {
  if (e.statusCode) {
    return resp.status(e.statusCode).send({ error: e.message });
  }
  resp.status(500).send();
}

module.exports = router;
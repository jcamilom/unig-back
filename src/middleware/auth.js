const UserController = require('../controllers/user');

const userController = new UserController();

const auth = async (req, resp, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = await userController.authenticate(token);
    req.user = user;
    next();
  } catch (e) {
    if (e.statusCode) {
      resp.status(e.statusCode).send({ error: e.message });
    }
    resp.status(401).send({ error: e.message })
  }
}

module.exports = auth;
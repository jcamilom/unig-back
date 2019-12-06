const UserController = require('../controllers/user');
const { ErrorUnauthorized } = require('../common/custom-errors');

const userController = new UserController();

const auth = async (req, resp, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const user = await userController.authenticate(token);
      req.user = user;
      next();
    } else {
      throw new ErrorUnauthorized('missing authentication token');
    }
  } catch (e) {
    if (e.statusCode) {
      resp.status(e.statusCode).send({ error: e.message });
    }
    resp.status(401).send({ error: e.message })
  }
}

module.exports = auth;
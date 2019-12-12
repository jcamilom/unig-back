const UserController = require('../controllers/user');
const RoleController = require('../controllers/role');
const { ErrorUnauthorized } = require('../common/custom-errors');

const userController = new UserController();
const roleController = new RoleController();

const auth = async (req, resp, next) => {
  try {
    // Authentication
    const authHeader = req.header('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const user = await userController.authenticate(token);
      req.user = user;
      // Authorization
      const isAuthorized = await roleController.validateResource(user, req.route.path, req.method);
      if (isAuthorized) {
        next();
      } else {
        throw new ErrorUnauthorized('user cannot access the resource');
      }
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
const { Resource, ResourceRole } = require('../db/db');
const { ErrorInternal } = require('../common/custom-errors');

class RoleController {

  async validateResource(roleId, path, method) {
    const resource = await Resource.findOne({
      where: { path, method }
    });

    if (!resource) {
      throw new ErrorInternal('The resource does not exist');
    }

    const resourceRole = await ResourceRole.findOne({
      where: {
        roleId,
        resourceId: resource.id
      }
    });

    if (resourceRole) {
      return true;
    }
    return false;
  }

}

module.exports = RoleController;

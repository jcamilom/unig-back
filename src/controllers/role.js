const { Resource, ResourceRole } = require('../db/db');
const { ErrorInternal } = require('../common/custom-errors');

class RoleController {

  async validateResource(user, path, method) {
    const resource = await Resource.findOne({
      where: { path, method }
    });

    if (!resource) {
      throw new ErrorInternal('The resource does not exist');
    }

    const roles = await user.getRoles();
    for (let role of roles) {
      const hasPermission = await ResourceRole.findOne({
        where: {
          roleId: role.id,
          resourceId: resource.id
        }
      });
  
      if (hasPermission) {
        return true;
      }
    }
    
    return false; 
  }

}

module.exports = RoleController;

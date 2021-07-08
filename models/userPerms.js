'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userPermissions.belongsTo(models.users,{foreignKey: 'user_id'})
      userPermissions.belongsTo(models.scope,{foreignKey: 'scope_id'})
      userPermissions.belongsTo(models.roles,{foreignKey: 'role_id'})
      userPermissions.belongsTo(models.users,{foreignKey: 'manager_id'});
    }
  };
  userPermissions.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    manager_id: DataTypes.INTEGER,
    //scopes: DataTypes.JSON,
    scope_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'userPermissions',
  });
  return userPermissions;
};
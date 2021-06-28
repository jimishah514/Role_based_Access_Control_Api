'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_perms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_perms.belongsTo(models.users,{foreignKey: 'user_id'})
      user_perms.belongsTo(models.scope,{foreignKey: 'scope_id'})
      user_perms.belongsTo(models.roles,{foreignKey: 'role_id'})
      user_perms.belongsTo(models.users,{foreignKey: 'manager_id'});
    }
  };
  user_perms.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    manager_id: DataTypes.INTEGER,
    //scopes: DataTypes.JSON,
    scope_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user_perms',
  });
  return user_perms;
};
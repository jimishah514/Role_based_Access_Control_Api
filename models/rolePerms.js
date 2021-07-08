'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rolePermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rolePermissions.belongsTo(models.roles,{foreignKey: 'role_id'})
      rolePermissions.belongsTo(models.features,{foreignKey: 'feat_id'})
    }
  };
  rolePermissions.init({
    role_id: DataTypes.INTEGER,
    feat_id: DataTypes.INTEGER,
    value: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'rolePermissions',
  });
  return rolePermissions;
};
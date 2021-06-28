'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_perms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role_perms.belongsTo(models.roles,{foreignKey: 'role_id'})
      role_perms.belongsTo(models.features,{foreignKey: 'feat_id'})
    }
  };
  role_perms.init({
    role_id: DataTypes.INTEGER,
    feat_id: DataTypes.INTEGER,
    value: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'role_perms',
  });
  return role_perms;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.rolePermissions,{foreignKey: 'role_id'})
      this.hasMany(models.userPermissions,{foreignKey: 'role_id'})
    }
  };
  roles.init({
    name: DataTypes.STRING,
    parent: DataTypes.INTEGER,
    reporting_link: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};
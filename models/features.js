'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class features extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({rolePermissions}) {
      // define association here
      this.hasMany(rolePermissions,{foreignKey: 'role_id'})
    }
  };
  features.init({
    action: DataTypes.STRING,
    resource_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'features',
  });
  return features;
};
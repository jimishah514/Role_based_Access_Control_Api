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
    static associate({role_perms}) {
      // define association here
      this.hasMany(role_perms,{foreignKey: 'role_id'})
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
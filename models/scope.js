'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.userPermissions,{foreignKey: 'scope_id'})
    }
  };
  scope.init({
    country_id: DataTypes.INTEGER,
    region_id: DataTypes.INTEGER,
    zone_id: DataTypes.INTEGER,
    area_group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'scope',
  });
  return scope;
};
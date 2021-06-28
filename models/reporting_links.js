'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reporting_links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  reporting_links.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reporting_links',
  });
  return reporting_links;
};
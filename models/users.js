'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user_perms,{foreignKey: 'user_id'})
      this.hasMany(models.user_perms,{foreignKey: 'manager_id'})
    }
  };
  users.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
const { VARCHAR } = require('mysql2/lib/constants/types.js');
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: "INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
    category_name: "STRING STRING"
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;

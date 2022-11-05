const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, allowNull: false, promaryKey: true, autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER, references: { model: 'tag', id: 'id' }
    },
    tag_id: {
      type: DataTypes.INTEGER, references: { model: 'tag', id: 'id' }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;

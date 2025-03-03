const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const FavouriteList = sequelize.define(
  "FavouriteList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true,
      },
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { tableName: "favourite_lists", underscored: true }
);

module.exports = FavouriteList;

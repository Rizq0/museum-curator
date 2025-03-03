const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const FavouriteList = require("./FavouriteList");

const Favourite = sequelize.define(
  "Favourite",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    favourite_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FavouriteList,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    artwork_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gallery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "favourites", underscored: true }
);

FavouriteList.hasMany(Favourite, {
  foreignKey: "favourite_list_id",
});
Favourite.belongsTo(FavouriteList, {
  foreignKey: "favourite_list_id",
});

module.exports = Favourite;

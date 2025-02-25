const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const FavoriteList = require("./FavouriteList");

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
        model: FavoriteList,
        key: "id",
      },
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

FavoriteList.hasMany(Favourite, {
  foreignKey: "favorite_list_id",
});
Favourite.belongsTo(FavoriteList, {
  foreignKey: "favorite_list_id",
});

module.exports = Favourite;

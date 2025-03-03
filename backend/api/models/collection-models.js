const FavouriteList = require("../../database/models/FavouriteList");

// fetchAllCollections has a hardcoded user_id of 1 for MVP purposes, due to no authentication setup
exports.fetchAllCollections = async () => {
  const collections = await FavouriteList.findAll({
    where: {
      user_id: 1,
    },
  });
  return collections;
};

exports.setACollection = async (name, user_id) => {
  const post = FavouriteList.create({
    name,
    user_id,
  });
  return post;
};

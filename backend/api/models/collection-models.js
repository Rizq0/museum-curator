const FavouriteList = require("../../database/models/FavouriteList");

// fetchAllCollections has a hardcoded user_id of 1 for MVP purposes, due to no authentication setup
exports.fetchAllCollections = async (page, limit, offset) => {
  const { count, rows } = await FavouriteList.findAndCountAll({
    limit: limit,
    offset: offset,
    where: {
      user_id: 1,
    },
  });
  const totalPages = Math.ceil(count / limit);
  return {
    data: rows,
    pagination: {
      total_pages: Number(totalPages),
      current_page: Number(page),
      total_results: Number(count),
    },
  };
};

exports.setACollection = async (name, user_id) => {
  try {
    const post = FavouriteList.create({
      name,
      user_id,
    });
    return post;
  } catch (error) {
    next(error);
  }
};

exports.fetchACollection = async (id) => {
  try {
    const collection = await FavouriteList.findByPk(id);
    return collection;
  } catch (error) {
    next(error);
  }
};

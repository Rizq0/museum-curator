const FavouriteList = require("../../database/models/FavouriteList");
const Favourite = require("../../database/models/Favourite");

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

exports.fetchAllArtworkByFavouriteList = async (id, page, limit, offset) => {
  const { count, rows } = await Favourite.findAndCountAll({
    limit: limit,
    offset: offset,
    where: {
      favourite_list_id: id,
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

exports.setArtworkToFavouriteList = async (
  favourite_list_id,
  artwork_id,
  gallery
) => {
  try {
    const checkIfArtworkExists = await Favourite.findOne({
      where: {
        favourite_list_id,
        artwork_id,
        gallery,
      },
    });
    if (checkIfArtworkExists) {
      return { message: "Artwork already exists in collection" };
    }

    const post = Favourite.create({
      favourite_list_id,
      artwork_id,
      gallery,
    });
    return post;
  } catch (error) {
    next(error);
  }
};

exports.deleteArtworkFromFavouriteList = async (
  favourite_list_id,
  artwork_id
) => {
  try {
    const artwork = await Favourite.findOne({
      where: {
        favourite_list_id,
        artwork_id,
      },
    });
    if (!artwork) {
      return { message: "Artwork not found in collection" };
    }
    await artwork.destroy();
    return { message: "Artwork successfully removed from collection" };
  } catch (error) {
    next(error);
  }
};

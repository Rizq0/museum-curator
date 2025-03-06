const Favourite = require("../../database/models/Favourite");

exports.fetchAllArtworks = async (page, limit, offset) => {
  const { count, rows } = await Favourite.findAndCountAll({
    limit: limit,
    offset: offset,
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

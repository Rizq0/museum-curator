const { fetchAllArtworks } = require("../models/artwork-models");

exports.getAllArtworks = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  const offset = (page - 1) * limit;
  try {
    const artworks = await fetchAllArtworks(page, limit, offset);
    res.status(200).json(artworks);
  } catch (error) {
    next(error);
  }
};

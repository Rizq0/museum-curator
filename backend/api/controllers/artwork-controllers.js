const {
  fetchAllArtworks,
  fetchAnArtworkByIdAndGallery,
} = require("../models/artwork-models");

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

exports.getAnArtworkByIdAndGallery = async (req, res, next) => {
  const supportedGalleries = ["harvard", "cleveland"];
  const { id } = req.params;
  const { gallery } = req.query;
  if (!gallery || !supportedGalleries.includes(gallery)) {
    return res.status(400).json({ message: "Invalid Gallery" });
  }
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const artwork = await fetchAnArtworkByIdAndGallery(id, gallery);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.status(200).json(artwork);
  } catch (error) {
    next(error);
  }
};

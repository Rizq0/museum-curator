const artworkRouter = require("express").Router();
const {
  getAllArtworks,
  getAnArtworkByIdAndGallery,
} = require("../../controllers/artwork-controllers");

artworkRouter.get("/", getAllArtworks);
artworkRouter.get("/:id", getAnArtworkByIdAndGallery);

module.exports = artworkRouter;

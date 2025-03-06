const artworkRouter = require("express").Router();
const { getAllArtworks } = require("../../controllers/artwork-controllers");

artworkRouter.get("/", getAllArtworks);

module.exports = artworkRouter;

const collectionRouter = require("express").Router();
const {
  getAllCollections,
  postACollection,
  getACollection,
  patchACollection,
  deleteACollection,
  getArtworksByCollection,
  postArtworkToCollection,
} = require("../../controllers/collection-controllers");

collectionRouter.get("/", getAllCollections);
collectionRouter.post("/", postACollection);
collectionRouter.get("/:id", getACollection);
collectionRouter.put("/:id", patchACollection);
collectionRouter.delete("/:id", deleteACollection);
collectionRouter.get("/:id/artworks", getArtworksByCollection);
collectionRouter.post("/:id/artworks", postArtworkToCollection);

module.exports = collectionRouter;

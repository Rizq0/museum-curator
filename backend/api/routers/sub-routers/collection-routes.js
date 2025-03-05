const collectionRouter = require("express").Router();
const {
  getAllCollections,
  postACollection,
  getACollection,
  patchACollection,
  deleteACollection,
} = require("../../controllers/collection-controllers");

collectionRouter.get("/", getAllCollections);
collectionRouter.post("/", postACollection);
collectionRouter.get("/:id", getACollection);
collectionRouter.put("/:id", patchACollection);
collectionRouter.delete("/:id", deleteACollection);

module.exports = collectionRouter;

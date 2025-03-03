const collectionRouter = require("express").Router();
const {
  getAllCollections,
  postACollection,
} = require("../../controllers/collection-controllers");

collectionRouter.get("/", getAllCollections);
collectionRouter.post("/", postACollection);

module.exports = collectionRouter;

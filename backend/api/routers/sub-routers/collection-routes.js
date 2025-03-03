const collectionRouter = require("express").Router();
const {
  getAllCollections,
} = require("../../controllers/collection-controllers");

collectionRouter.get("/", getAllCollections);

module.exports = collectionRouter;

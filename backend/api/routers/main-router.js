const apiRouter = require("express").Router();
const { getApiEndpoints } = require("../controllers/api-controllers");
const collectionRouter = require("./sub-routers/collection-routes");
const artworkRouter = require("./sub-routers/artwork-routes");

apiRouter.get("/", getApiEndpoints);
apiRouter.use("/collections", collectionRouter);
apiRouter.use("/artworks", artworkRouter);

module.exports = apiRouter;

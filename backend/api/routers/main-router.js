const apiRouter = require("express").Router();
const { getApiEndpoints } = require("../controllers/api-controllers");
const collectionRouter = require("./sub-routers/collection-routes");
const artworkRouter = require("./sub-routers/artwork-routes");
const proxyRouter = require("./sub-routers/proxy-routes");

apiRouter.get("/", getApiEndpoints);
apiRouter.use("/collections", collectionRouter);
apiRouter.use("/artworks", artworkRouter);
apiRouter.use("/proxy", proxyRouter);

module.exports = apiRouter;

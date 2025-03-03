const apiRouter = require("express").Router();
const { getApiEndpoints } = require("../controllers/api-controllers");
const collectionRouter = require("./sub-routers/collection-routes");

apiRouter.get("/", getApiEndpoints);
apiRouter.use("/collections", collectionRouter);

module.exports = apiRouter;

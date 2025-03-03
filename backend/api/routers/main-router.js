const apiRouter = require("express").Router();
const { getApiEndpoints } = require("../controllers/api-controllers");

apiRouter.get("/", getApiEndpoints);

module.exports = apiRouter;

const express = require("express");
const cors = require("cors");
const app = express();
const { testRoute, testError } = require("./controllers/test-controllers");
const { errorHandler } = require("./error-handlers/error-handlers");

app.use(cors());
app.use(express.json());

app.get("/api/test", testRoute);

app.get("/api/test-error", testError);

app.use(errorHandler);

module.exports = { app };

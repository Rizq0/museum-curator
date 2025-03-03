const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("../api/routers/main-router");
const { errorHandler } = require("./error-handlers/error-handlers");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

app.use(errorHandler);

module.exports = { app };

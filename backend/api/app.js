const express = require("express");
const cors = require("cors");
const app = express();
const { testRoute } = require("../controllers/test-controllers");

app.use(cors());
app.use(express.json());

app.get("/api/test", testRoute);

module.exports = { app };

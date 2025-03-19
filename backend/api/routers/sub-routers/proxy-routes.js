const {
  proxyClevelandArt,
  proxyHarvardArt,
} = require("../../controllers/proxy-controllers");

const proxyRouter = require("express").Router();

proxyRouter.get("/cleveland/artworks", proxyClevelandArt);
proxyRouter.get("/cleveland/artworks/:id", proxyClevelandArt);
proxyRouter.get("/harvard/object", proxyHarvardArt);
proxyRouter.get("/harvard/object/:id", proxyHarvardArt);

module.exports = proxyRouter;

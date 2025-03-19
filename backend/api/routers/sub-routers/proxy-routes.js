const { proxyClevelandArt } = require("../../controllers/proxy-controllers");

const proxyRouter = require("express").Router();

proxyRouter.get("/cleveland/artworks", proxyClevelandArt);
proxyRouter.get("/cleveland/artworks/:id", proxyClevelandArt);

module.exports = proxyRouter;

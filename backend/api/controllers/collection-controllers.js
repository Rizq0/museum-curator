const { fetchAllCollections } = require("../models/collection-models");

exports.getAllCollections = async (req, res, next) => {
  try {
    const collections = await fetchAllCollections();
    res.status(200).json(collections);
  } catch (error) {
    next(error);
  }
};

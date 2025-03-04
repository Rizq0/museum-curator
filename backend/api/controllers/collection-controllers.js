const {
  fetchAllCollections,
  setACollection,
} = require("../models/collection-models");

exports.getAllCollections = async (req, res, next) => {
  try {
    const collections = await fetchAllCollections();
    res.status(200).json(collections);
  } catch (error) {
    next(error);
  }
};

exports.postACollection = async (req, res, next) => {
  const { name, user_id } = req.body;
  try {
    const response = await setACollection(name, user_id);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

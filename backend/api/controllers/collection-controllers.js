const {
  fetchAllCollections,
  setACollection,
  fetchACollection,
  fetchAllArtworkByFavouriteList,
} = require("../models/collection-models");

exports.getAllCollections = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  const offset = (page - 1) * limit;
  try {
    const collections = await fetchAllCollections(page, limit, offset);
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

exports.getACollection = async (req, res, next) => {
  const { id } = req.params;
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const collection = await fetchACollection(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    next(error);
  }
};

exports.patchACollection = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const collection = await fetchACollection(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    const updatedCollection = await collection.update({ name });
    res.status(200).json(updatedCollection);
  } catch (error) {
    next(error);
  }
};

exports.deleteACollection = async (req, res, next) => {
  const { id } = req.params;
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const collection = await fetchACollection(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    await collection.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getArtworksByCollection = async (req, res, next) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  const offset = (page - 1) * limit;
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const collection = await fetchACollection(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection Not Found" });
    }
    const artworks = await fetchAllArtworkByFavouriteList(
      id,
      page,
      limit,
      offset
    );
    res.status(200).json(artworks);
  } catch (error) {
    next(error);
  }
};

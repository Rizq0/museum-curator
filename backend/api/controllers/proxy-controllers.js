const axios = require("axios");

exports.proxyClevelandArt = async (req, res, next) => {
  const { id } = req.params;
  const queryParams = req.query;
  const baseUrl = "https://openaccess-api.clevelandart.org/api";

  try {
    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const response = await axios.get(`${baseUrl}/artworks/${id}`, {
        timeout: 5000,
      });

      return res.status(200).json(response.data);
    }

    const response = await axios.get(`${baseUrl}/artworks`, {
      params: queryParams,
      timeout: 5000,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    next(error);
  }
};

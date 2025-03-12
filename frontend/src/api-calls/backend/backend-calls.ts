import axios from "axios";

const apiClient = axios.create({
  baseURL: "/backend",
  timeout: 1000,
});

export const checkIfArtworkIsFavourited = async (
  id: string,
  gallery: string
) => {
  try {
    return await apiClient.get(`/artworks/${id}?gallery=${gallery}`);
  } catch (error) {
    throw new Error("Error checking if artwork is favourited");
  }
};

export const fetchCollections = async () => {
  try {
    return await apiClient.get("/collections");
  } catch (error) {
    throw new Error("Error fetching collections");
  }
};

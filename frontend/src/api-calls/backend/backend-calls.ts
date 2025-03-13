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

export const fetchCollections = async (page: number) => {
  try {
    return await apiClient.get(`/collections?page=${page}`);
  } catch (error) {
    throw new Error("Error fetching collections");
  }
};

export const fetchCollectionById = async (id: number) => {
  if (!id) {
    throw new Error("No collection id provided");
  }
  try {
    return await apiClient.get(`/collections/${id}`);
  } catch (error) {
    throw new Error("Error fetching collection");
  }
};

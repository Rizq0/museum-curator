import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api",
  timeout: 1000,
});

export const getClevelandArt = async (page: number) => {
  const limit = 15;
  const skip = (page - 1) * limit;
  try {
    return await apiClient.get("/artworks", {
      params: {
        skip: skip,
        limit: limit,
      },
    });
  } catch (error) {
    throw new Error("Error fetching Cleveland Art");
  }
};

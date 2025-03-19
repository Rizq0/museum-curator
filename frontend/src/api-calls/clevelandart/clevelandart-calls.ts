import axios from "axios";

const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api/proxy/cleveland"
      : "https://museum-curator-api.onrender.com/api/proxy/cleveland",
  timeout: 5000,
});

export const getClevelandArt = async (page: number, queryString: string) => {
  const limit = 15;
  const skip = (page - 1) * limit;
  try {
    return await apiClient.get("/artworks", {
      params: {
        skip: skip,
        limit: limit,
        q: queryString,
      },
    });
  } catch (error) {
    throw new Error("Error fetching Cleveland Art");
  }
};

export const getClevelandArtById = async (id: number) => {
  try {
    return await apiClient.get(`/artworks/${id}`);
  } catch (error) {
    throw new Error("Error fetching Cleveland Art");
  }
};

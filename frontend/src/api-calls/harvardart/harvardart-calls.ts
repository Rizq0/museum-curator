import axios from "axios";
const apiKey = "f107d8d0-3810-4090-857b-318e50860289"; // this is a public key, backend proxy not needed for development purposes

const apiClient = axios.create({
  baseURL: "https://api.harvardartmuseums.org",
  timeout: 1000,
});

apiClient.interceptors.request.use((config) => {
  config.params.apikey = apiKey;
  return config;
});

export const getHarvardArt = async (page: number) => {
  try {
    return await apiClient.get("/object", {
      params: {
        size: 15,
        page: page,
        sort: "id",
        order: "asc",
      },
    });
  } catch (error) {
    throw new Error("Error fetching Harvard Art");
  }
};

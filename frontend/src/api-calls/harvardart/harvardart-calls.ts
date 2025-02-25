import axios from "axios";
const apiKey = "f107d8d0-3810-4090-857b-318e50860289";

const apiClient = axios.create({
  baseURL: "https://api.harvardartmuseums.org",
  timeout: 1000,
});

apiClient.interceptors.request.use((config) => {
  config.params.apikey = apiKey;
  return config;
});

export const getHarvardArt = async () => {
  return await apiClient.get("/object", {
    params: {
      size: 15,
      page: 1,
    },
  });
};

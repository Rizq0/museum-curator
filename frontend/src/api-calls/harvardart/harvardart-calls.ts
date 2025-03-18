import axios from "axios";
const apiKey = "f107d8d0-3810-4090-857b-318e50860289"; // this is a public key, backend proxy not needed for development purposes

const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/harvard"
      : "https://museum-curator-api.onrender.com/api",
  timeout: 1000,
  params: {
    apikey: apiKey,
  },
});

export const getHarvardArt = async (page: number, queryString: string) => {
  try {
    return await apiClient.get("/object", {
      params: {
        size: 15,
        page: page,
        sort: "id",
        order: "asc",
        q: queryString,
      },
    });
  } catch (error) {
    throw new Error("Error fetching Harvard Art");
  }
};

export const getHarvardArtById = async (id: number) => {
  try {
    return await apiClient.get(`/object/${id}`);
  } catch (error) {
    throw new Error("Error fetching Harvard Art");
  }
};

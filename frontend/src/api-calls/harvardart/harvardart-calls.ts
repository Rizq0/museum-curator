import axios from "axios";

const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api/proxy/harvard"
      : "https://museum-curator-api.onrender.com/api/proxy/harvard",
  timeout: 5000,
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

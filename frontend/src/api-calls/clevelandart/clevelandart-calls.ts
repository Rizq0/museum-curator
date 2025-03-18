import axios from "axios";

const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/cleveland"
      : "https://cors-anywhere.herokuapp.com/https://openaccess-api.clevelandart.org/api", // This is a workaround for CORS issues, not to be used in full production. Only MVP / Demo. Backend proxy will be used for production.
  timeout: 1000,
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

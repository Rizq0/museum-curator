const request = require("supertest");
const { app } = require("../api/app");
const sequelize = require("../database/connection");
const seedDatabase = require("../database/seed/seed-database");
const endpointData = require("../api/endpoints.json");

let isConnected = false;

beforeEach(async () => {
  try {
    await sequelize.authenticate();
    isConnected = true;
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    await seedDatabase();
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
});

afterAll(async () => {
  if (isConnected) {
    await sequelize.close();
    console.log("Connection has been closed successfully.");
  }
});

describe("API Endpoints", () => {
  describe("Error handling", () => {
    it("404: Returns an error if endpoint is not found.", async () => {
      const response = await request(app).get("/api/invalid");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Route Not Found" });
    });
    it("404: Returns an error if given an empty path.", async () => {
      const response = await request(app).get("");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Route Not Found" });
    });
  });
  describe("GET /api", () => {
    it("200: Fetches all the api endpoints.", async () => {
      const response = await request(app).get("/api");
      const body = response.body;
      expect(response.status).toBe(200);
      expect(Object.keys(body).length).toEqual(
        Object.keys(endpointData).length
      );
      Object.keys(endpointData).forEach((key) => {
        expect(body).toHaveProperty(key);
      });
    });
  });
  describe("GET /api/collections", () => {
    it("200: Returns paginated collections in relation to the current hardcoded user id (1), default query is ?page=1 if no query is given.", async () => {
      const response = await request(app).get("/api/collections");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(15);
      body.forEach((collection) => {
        expect(collection).toHaveProperty("id");
        expect(collection).toHaveProperty("name");
        expect(collection).toHaveProperty("user_id");
      });
    });
    it("200: Returns the correct number of collections for the first page (15).", async () => {
      const response = await request(app).get("/api/collections?page=1");
      const body = response.body.pagination;
      expect(response.status).toBe(200);
      expect(body).toHaveProperty("total_pages");
      expect(body).toHaveProperty("current_page");
      expect(body).toHaveProperty("total_results");
    });
    it("200: Returns the correct number of collections for second page (5).", async () => {
      const response = await request(app).get("/api/collections?page=2");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(5);
    });
    it("200: Returns the correct number of collections for third page (0).", async () => {
      const response = await request(app).get("/api/collections?page=3");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(0);
    });
    it("200: Returns the correct number of collections for first page (15) when query is invalid.", async () => {
      const response = await request(app).get("/api/collections?page=invalid");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(15);
    });
    it("200: Returns the correct number of collections for first page (15) when page is incorrectly spelt.", async () => {
      const response = await request(app).get("/api/collections?pag=1");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(15);
    });
  });
  describe("POST /api/collections", () => {
    it("201: Posts a new collection.", async () => {
      const response = await request(app).post("/api/collections").send({
        name: "New Collection",
        user_id: 1,
      });
      const body = response.body;
      expect(response.status).toBe(201);
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("user_id");
    });
    it("400: Returns a error if name or user_id is missing.", async () => {
      const response = await request(app).post("/api/collections").send({
        name: "New Collection",
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        // Sequelize error message specific to this case - FavouriteList.name cannot be null would be the error message if name was missing
        message: "FavouriteList.user_id cannot be null",
      });
    });
    it("400: Returns a error if user_id is incorrect data type.", async () => {
      const response = await request(app).post("/api/collections").send({
        name: 12345,
        user_id: "test",
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Validation isInt on user_id failed",
      });
    });
    it("400: Returns a error if name is empty.", async () => {
      const response = await request(app).post("/api/collections").send({
        name: "",
        user_id: 1,
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message:
          "Validation notEmpty on name failed, Validation len on name failed",
      });
    });
    it("400: Returns a error if name is too long.", async () => {
      const response = await request(app).post("/api/collections").send({
        name: "This title is very long, so I want to test how long it can really get",
        user_id: 1,
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Validation len on name failed",
      });
    });
  });
  describe("GET /api/collections/:id", () => {
    it("200: Returns a collection by id.", async () => {
      const response = await request(app).get("/api/collections/1");
      const body = response.body;
      expect(response.status).toBe(200);
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("user_id");
    });
    it("404: Returns an error if collection id does not exist.", async () => {
      const response = await request(app).get("/api/collections/100");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Collection not found" });
    });
    it("400: Returns an error if collection id is not a number.", async () => {
      const response = await request(app).get("/api/collections/invalid");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
  });
  describe("PUT /api/collections/:id", () => {
    it("200: Updates a collection by id", async () => {
      const response = await request(app).put("/api/collections/1").send({
        name: "Updated Collection Name",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("name", "Updated Collection Name");
    });
    it("404: Returns an error if collection id does not exist", async () => {
      const response = await request(app).put("/api/collections/100").send({
        name: "Updated Collection Name",
      });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Collection not found" });
    });
    it("400: Returns an error if name is invalid", async () => {
      const response = await request(app).put("/api/collections/1").send({
        name: "",
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message:
          "Validation notEmpty on name failed, Validation len on name failed",
      });
    });
    it("400: Returns an error if collection id is not a number", async () => {
      const response = await request(app).put("/api/collections/invalid").send({
        name: "Updated Collection Name",
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
    it("400: Returns an error if name is too long", async () => {
      const response = await request(app).put("/api/collections/1").send({
        name: "This title is very long, so I want to test how long it can really get",
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Validation len on name failed",
      });
    });
  });
  describe("DELETE /api/collections/:id", () => {
    it("204: Deletes a collection by id", async () => {
      const response = await request(app).delete("/api/collections/1");
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
    it("404: Returns an error if collection id does not exist", async () => {
      const response = await request(app).delete("/api/collections/100");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Collection not found" });
    });
    it("400: Returns an error if collection id is not a number", async () => {
      const response = await request(app).delete("/api/collections/invalid");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
  });
  describe("GET /api/artworks", () => {
    it("200: Returns paginated artworks in relation to the current hardcoded user id (1), default query is ?page=1 if no query is given.", async () => {
      const response = await request(app).get("/api/artworks");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(15);
      body.forEach((artwork) => {
        expect(artwork).toHaveProperty("id");
        expect(artwork).toHaveProperty("favourite_list_id");
        expect(artwork).toHaveProperty("artwork_id");
        expect(artwork).toHaveProperty("gallery");
      });
    });
    it("200: Returns the correct number of artworks for the first page (15).", async () => {
      const response = await request(app).get("/api/artworks?page=1");
      const body = response.body.pagination;
      const data = response.body.data;
      expect(response.status).toBe(200);
      expect(data).toHaveLength(15);
      expect(body).toHaveProperty("total_pages");
      expect(body).toHaveProperty("current_page");
      expect(body).toHaveProperty("total_results");
    });
    it("200: Returns the correct number of artworks for second page (5).", async () => {
      const response = await request(app).get("/api/artworks?page=2");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(5);
    });
    it("200: Returns the correct number of artworks for third page (0).", async () => {
      const response = await request(app).get("/api/artworks?page=3");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(0);
    });
    it("200: Returns the correct number of artworks for first page (15) when query is invalid.", async () => {
      const response = await request(app).get("/api/artworks?page=invalid");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(15);
    });
    it("200: Returns the correct number of artworks for first page (15) when page is incorrectly spelt.", async () => {
      const response = await request(app).get("/api/artworks?pag=1");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(15);
    });
  });
  describe("GET /api/artworks/:id?gallery=:gallery", () => {
    it("200: Returns an artwork by id.", async () => {
      const response = await request(app).get(
        "/api/artworks/1?gallery=harvard"
      );
      const body = response.body;
      expect(response.status).toBe(200);
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("favourite_list_id");
      expect(body).toHaveProperty("artwork_id");
      expect(body).toHaveProperty("gallery");
    });
    it("404: Returns an error if artwork id does not exist.", async () => {
      const response = await request(app).get(
        "/api/artworks/100?gallery=harvard"
      );
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Artwork not found" });
    });
    it("400: Returns an error if artwork id is not a number.", async () => {
      const response = await request(app).get(
        "/api/artworks/invalid?gallery=harvard"
      );
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
    it("400: Returns an error if gallery is missing.", async () => {
      const response = await request(app).get("/api/artworks/1");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid Gallery" });
    });
    it("400: Returns an error if gallery is empty.", async () => {
      const response = await request(app).get("/api/artworks/1?gallery=");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid Gallery" });
    });
    it("400: Returns an error if gallery is not a string.", async () => {
      const response = await request(app).get("/api/artworks/1?gallery=12345");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid Gallery" });
    });
  });
  describe("GET /api/collections/:id/artworks", () => {
    it("200: Returns paginated (15 limit) artworks within a collection by favourite_list_id.", async () => {
      const response = await request(app).get(
        "/api/collections/1/artworks?page=1"
      );
      const body = response.body.data;
      expect(response.status).toBe(200);
      body.forEach((artwork) => {
        expect(artwork).toHaveProperty("id");
        expect(artwork).toHaveProperty("favourite_list_id");
        expect(artwork).toHaveProperty("artwork_id");
        expect(artwork).toHaveProperty("gallery");
      });
    });
    it("200: Returns the pagination object for the first page.", async () => {
      const response = await request(app).get(
        "/api/collections/1/artworks?page=1"
      );
      const body = response.body.pagination;
      expect(response.status).toBe(200);
      expect(body).toHaveProperty("total_pages");
      expect(body).toHaveProperty("current_page");
      expect(body).toHaveProperty("total_results");
    });
    it("404: Returns an error if collection id does not exist.", async () => {
      const response = await request(app).get(
        "/api/collections/100/artworks?page=1"
      );
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Collection not found" });
    });
    it("400: Returns an error if collection id is not a number.", async () => {
      const response = await request(app).get(
        "/api/collections/invalid/artworks?page=1"
      );
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
    it("200: Returns the first page of the collection if page is NaN or invalid.", async () => {
      const response = await request(app).get(
        "/api/collections/1/artworks?page=invalid"
      );
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body).toHaveLength(2);
    });
    it("200: Returns the first page of artworks if page is missing from query.", async () => {
      const response = await request(app).get("/api/collections/1/artworks");
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(2);
    });
    it("200: Returns the first page of artworks if page is incorrectly spelt.", async () => {
      const response = await request(app).get(
        "/api/collections/1/artworks?pag=1"
      );
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(2);
    });
  });
  describe("POST /api/collections/:id/artworks", () => {
    it("201: Posts an new artwork, with a favourite_list_id.", async () => {
      const response = await request(app)
        .post("/api/collections/1/artworks")
        .send({
          artwork_id: 1650,
          gallery: "harvard",
        });
      const body = response.body;
      expect(response.status).toBe(201);
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("favourite_list_id", "1");
      expect(body).toHaveProperty("artwork_id", 1650);
      expect(body).toHaveProperty("gallery", "harvard");
    });
    it("400: Returns an error if artwork_id or gallery is missing.", async () => {
      const response = await request(app)
        .post("/api/collections/1/artworks")
        .send({
          artwork_id: 1650,
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Missing required parameters" });
    });
    it("400: Returns an error if artwork_id or gallery is incorrect data type.", async () => {
      const response = await request(app)
        .post("/api/collections/1/artworks")
        .send({
          artwork_id: "test",
          gallery: 12345,
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Required parameters are incorrect",
      });
    });
    it("400: Returns an error if collection id does not exist.", async () => {
      const response = await request(app)
        .post("/api/collections/100/artworks")
        .send({
          artwork_id: 1650,
          gallery: "harvard",
        });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Collection not found" });
    });
    it("400: Returns an error if collection id is not a number.", async () => {
      const response = await request(app)
        .post("/api/collections/invalid/artworks")
        .send({
          artwork_id: 1650,
          gallery: "harvard",
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
    it("400: Returns an error if gallery is not supported.", async () => {
      const response = await request(app)
        .post("/api/collections/1/artworks")
        .send({
          artwork_id: 1650,
          gallery: "invalid",
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Required parameters are incorrect",
      });
    });
    it("400: Returns an error if gallery is empty.", async () => {
      const response = await request(app)
        .post("/api/collections/1/artworks")
        .send({
          artwork_id: 1650,
          gallery: "",
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Missing required parameters",
      });
    });
    it("400: Returns an error if artwork already exists in collection with the same, favourite_list_id, artwork_id and gallery.", async () => {
      const response = await request(app)
        .post("/api/collections/1/artworks")
        .send({
          artwork_id: 1,
          gallery: "harvard",
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Artwork already exists in collection",
      });
    });
    it("400: Returns an error if gallery name has incorrect casing.", async () => {
      const response = await request(app)
        .post("/api/collections/1/artworks")
        .send({
          artwork_id: 1650,
          gallery: "Harvard",
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Required parameters are incorrect",
      });
    });
  });
  describe("DELETE /api/collections/:id/artworks/:artwork_id", () => {
    it("204: Deletes an artwork by collection_id and artwork_id.", async () => {
      const response = await request(app).delete(
        "/api/collections/1/artworks/1"
      );
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
    it("404: Returns an error if artwork id does not exist.", async () => {
      const response = await request(app).delete(
        "/api/collections/1/artworks/100"
      );
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Artwork not found in collection",
      });
    });
    it("400: Returns an error if artwork id is not a number.", async () => {
      const response = await request(app).delete(
        "/api/collections/1/artworks/invalid"
      );
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
    it("404: Returns an error if collection id does not exist.", async () => {
      const response = await request(app).delete(
        "/api/collections/100/artworks/1"
      );
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Collection not found" });
    });
    it("400: Returns an error if collection id is not a number.", async () => {
      const response = await request(app).delete(
        "/api/collections/invalid/artworks/1"
      );
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
  });
});

describe("Cleveland Art Museum - Proxy", () => {
  describe("GET /api/proxy/cleveland/artworks", () => {
    it("200: Returns paginated artworks from the Cleveland Art Museum API, limit value = 15, skip value = (page - 1) * limit, q=``.", async () => {
      const response = await request(app).get(
        "/api/proxy/cleveland/artworks?skip=0&limit=15&q="
      );
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body.length).toBe(15);
      body.forEach((artwork) => {
        expect(artwork).toHaveProperty("id");
        expect(artwork).toHaveProperty("title");
      });
    });
    it("200: Returns an artwork by id.", async () => {
      const response = await request(app).get(
        "/api/proxy/cleveland/artworks/94979"
      );
      const body = response.body.data;
      expect(response.status).toBe(200);
      expect(body).toHaveProperty("id", 94979);
      expect(body).toHaveProperty("title", "Nathaniel Hurd");
    });
    it("404: Returns an error if artwork id does not exist.", async () => {
      const response = await request(app).get(
        "/api/proxy/cleveland/artworks/100000"
      );
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Artwork not found" });
    });
    it("400: Returns an error if artwork id is not a number.", async () => {
      const response = await request(app).get(
        "/api/proxy/cleveland/artworks/invalid"
      );
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid ID" });
    });
  });
});

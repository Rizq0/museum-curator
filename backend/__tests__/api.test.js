const request = require("supertest");
const { app } = require("../api/app");
const sequelize = require("../database/connection");
const seedDatabase = require("../database/seed/seed-database");
const endpointData = require("../api/endpoints.json");

let isConnected = false;

beforeAll(async () => {
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
    it("200: Fetches all collections in relation to the current hardcoded user id (1).", async () => {
      const response = await request(app).get("/api/collections");
      const body = response.body;
      expect(response.status).toBe(200);
      expect(body.length).toBe(2);
      body.forEach((collection) => {
        expect(collection).toHaveProperty("id");
        expect(collection).toHaveProperty("name");
        expect(collection).toHaveProperty("user_id");
      });
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
        message: "FavouriteList.user_id cannot be null", // Sequelize error message specific to this case - FavouriteList.name cannot be null would be the error message if name was missing
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
        message: "Validation notEmpty on name failed",
      });
    });
  });
});

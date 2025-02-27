const request = require("supertest");
const { app } = require("../api/app");
const sequelize = require("../database/connection");
const seedDatabase = require("../database/seed/seed-database");

let isConntected = false;

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    isConntected = true;
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    await seedDatabase();
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
});

afterAll(async () => {
  if (isConntected) {
    await sequelize.close();
    console.log("Connection has been closed successfully.");
  }
});

describe("API Endpoints", () => {
  describe("GET /api/test", () => {
    it("should return status 200", async () => {
      const response = await request(app).get("/api/test");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Test route works!");
    });
  });
});

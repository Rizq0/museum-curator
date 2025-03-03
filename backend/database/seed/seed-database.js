const ENV = process.env.NODE_ENV || "development";
const { seedTest, seedDev, seedProd } = require("./seed-functions");
const pathToCorrectENV = `${__dirname}/../../.env.${ENV}`;
require("dotenv").config({
  path: pathToCorrectENV,
});

const sequelize = require("../connection");

const seedDatabase = async () => {
  console.log("Seeding database...");
  console.log("Using ENV:", ENV);
  try {
    await sequelize.sync({ force: true });
    if (ENV === "test") {
      await seedTest();
    }
    if (ENV === "development") {
      await seedDev();
    }
    if (ENV === "production") {
      await seedProd();
    }
  } catch (err) {
    console.error("Seed failed:", err);
    throw err;
  }
};

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seed completed successfully");
      sequelize.close();
    })
    .catch((err) => {
      console.error("Seed failed:", err);
      sequelize.close();
    });
}

module.exports = seedDatabase;

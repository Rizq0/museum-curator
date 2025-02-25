const sequelize = require("../connection");

async function initialiseDatabase() {
  try {
    await sequelize.sync({ force: true }); // force: true will drop the table if it already exists
    console.log("Database synchronised.");
  } catch (error) {
    console.error("Error initialising database:", error);
  } finally {
    sequelize.close();
  }
}

initialiseDatabase();

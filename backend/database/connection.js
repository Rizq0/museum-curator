const { Sequelize } = require("sequelize");

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database-production.sqlite",
  });
} else if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database-test.sqlite",
  });
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database-development.sqlite",
  });
}

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

if (require.main === module) {
  testConnection();
}

module.exports = sequelize;

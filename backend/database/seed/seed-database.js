const ENV = process.env.NODE_ENV || "development";
const pathToCorrectENV = `${__dirname}/../../.env.${ENV}`;
require("dotenv").config({
  path: pathToCorrectENV,
});

const sequelize = require("../connection");
const Favourite = require("../models/Favourite");
const FavouriteList = require("../models/FavouriteList");

const seedDatabase = async () => {
  console.log("Seeding database...");
  console.log("Using ENV:", ENV);

  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized!");

    const favouriteList = await FavouriteList.bulkCreate([
      { user_id: "1", name: "Favourite List 1" },
      { user_id: "1", name: "Favourite List 2" },
    ]);
    console.log(`Favourite List created: ${favouriteList.length}`);

    const favourite = await Favourite.bulkCreate([
      {
        favourite_list_id: 1,
        artwork_id: 1,
        gallery: "havard",
      },
      {
        favourite_list_id: 1,
        artwork_id: 2,
        gallery: "cleveland",
      },
      {
        favourite_list_id: 2,
        artwork_id: 3,
        gallery: "havard",
      },
    ]);
    console.log(`Favourite created: ${favourite.length}`);

    console.log("Database seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
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

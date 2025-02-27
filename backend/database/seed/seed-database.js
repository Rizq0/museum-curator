const ENV = process.env.NODE_ENV || "development";
const pathToCorrectENV = `${__dirname}/../../.env.${ENV}`;
require("dotenv").config({
  path: pathToCorrectENV,
});

const sequelize = require("../connection");
const Favorite = require("../models/Favourite");
const FavouriteList = require("../models/FavouriteList");

const seedDatabase = async () => {
  console.log("Seeding database...");
  console.log(`Using database: ${process.env.DATABASE_STORAGE}`);

  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized!");

    const favouriteList = await FavouriteList.bulkCreate([
      { user_id: "1", name: "Favourite List 1" },
      { user_id: "1", name: "Favourite List 2" },
    ]);
    console.log(`Favourite List created: ${favouriteList.length}`);

    const favourite = await Favorite.bulkCreate([
      {
        favourite_list_id: favouriteList[0].id,
        artwork_id: 1,
        gallery: "havard",
      },
      {
        favourite_list_id: favouriteList[0].id,
        artwork_id: 2,
        gallery: "cleveland",
      },
      {
        favourite_list_id: favouriteList[1].id,
        artwork_id: 3,
        gallery: "havard",
      },
    ]);
    console.log(`Favourite created: ${favourite.length}`);

    console.log("Database seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    sequelize.close();
  }
};

seedDatabase();

module.exports = seedDatabase;

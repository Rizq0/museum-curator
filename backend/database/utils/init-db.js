const sequelize = require("../connection");
const FavouriteList = require("../models/FavouriteList");
const Favourite = require("../models/Favourite");

async function initialiseDatabase() {
  try {
    await sequelize.sync({ force: true }); // force: true will drop the table if it already exists
    console.log("Database synchronised.");

    const testList = await FavouriteList.create({
      user_id: 1,
      name: "Test List",
    });

    const testFavorite = await Favourite.create({
      favourite_list_id: testList.id,
      artwork_id: 1,
      gallery: "Test Gallery",
    });

    console.log("Database initialised.");
    console.log(testList.toJSON());
    console.log(testFavorite.toJSON());
  } catch (error) {
    console.error("Error initialising database:", error);
  } finally {
    sequelize.close();
  }
}

initialiseDatabase();

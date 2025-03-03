const Favourite = require("../models/Favourite");
const FavouriteList = require("../models/FavouriteList");

const seedTest = async () => {
  const favouriteList = await FavouriteList.bulkCreate([
    { user_id: "1", name: "Favourite List 1" },
    { user_id: "1", name: "Favourite List 2" },
  ]);
  console.log(`Favourite List created: ${favouriteList.length}`);
  const favourite = await Favourite.bulkCreate([
    { favourite_list_id: 1, artwork_id: 1, gallery: "havard" },
    { favourite_list_id: 1, artwork_id: 2, gallery: "cleveland" },
    { favourite_list_id: 2, artwork_id: 3, gallery: "havard" },
  ]);
  console.log(`Favourite created: ${favourite.length}`);
  console.log("Test Database seeded!");
};

const seedDev = async () => {
  const favouriteList = await FavouriteList.bulkCreate([
    { user_id: "1", name: "Short" },
    {
      user_id: "1",
      name: "This title is very long, so I want to test how long is can really get",
    },
  ]);
  console.log(`Favourite List created: ${favouriteList.length}`);
  const favourite = await Favourite.bulkCreate([
    { favourite_list_id: 1, artwork_id: 1430, gallery: "havard" },
    { favourite_list_id: 1, artwork_id: 94979, gallery: "cleveland" },
    { favourite_list_id: 2, artwork_id: 1432, gallery: "havard" },
  ]);
  console.log(`Favourite created: ${favourite.length}`);
  console.log("Development Database seeded!");
};

// production seed created as mvp will require data to be seeded, sqlite will not persist data when hosted
const seedProd = async () => {
  const favouriteList = await FavouriteList.bulkCreate([
    { user_id: "1", name: "Favourite List 1" },
    { user_id: "1", name: "Favourite List 2" },
    { user_id: "1", name: "Favourite List 3" },
    { user_id: "1", name: "Favourite List 4" },
    { user_id: "1", name: "Favourite List 5" },
    { user_id: "1", name: "Favourite List 6" },
    { user_id: "1", name: "Favourite List 7" },
    { user_id: "1", name: "Favourite List 8" },
    { user_id: "1", name: "Favourite List 9" },
    { user_id: "1", name: "Favourite List 10" },
  ]);
  console.log(`Favourite List created: ${favouriteList.length}`);
  const favourite = await Favourite.bulkCreate([
    { favourite_list_id: 1, artwork_id: 1430, gallery: "havard" },
    { favourite_list_id: 1, artwork_id: 94979, gallery: "cleveland" },
    { favourite_list_id: 1, artwork_id: 1432, gallery: "havard" },
    { favourite_list_id: 1, artwork_id: 151904, gallery: "cleveland" },
    { favourite_list_id: 2, artwork_id: 1434, gallery: "havard" },
    { favourite_list_id: 3, artwork_id: 141639, gallery: "cleveland" },
    { favourite_list_id: 4, artwork_id: 1436, gallery: "havard" },
    { favourite_list_id: 4, artwork_id: 153765, gallery: "cleveland" },
    { favourite_list_id: 4, artwork_id: 4585, gallery: "havard" },
    { favourite_list_id: 5, artwork_id: 114974, gallery: "cleveland" },
    { favourite_list_id: 6, artwork_id: 4586, gallery: "havard" },
    { favourite_list_id: 6, artwork_id: 149146, gallery: "cleveland" },
    { favourite_list_id: 7, artwork_id: 4587, gallery: "havard" },
    { favourite_list_id: 7, artwork_id: 123435, gallery: "cleveland" },
    { favourite_list_id: 8, artwork_id: 4588, gallery: "havard" },
    { favourite_list_id: 8, artwork_id: 118679, gallery: "cleveland" },
    { favourite_list_id: 9, artwork_id: 4630, gallery: "havard" },
    { favourite_list_id: 9, artwork_id: 122348, gallery: "cleveland" },
    { favourite_list_id: 10, artwork_id: 5131, gallery: "havard" },
    { favourite_list_id: 10, artwork_id: 110442, gallery: "cleveland" },
  ]);
  console.log(`Favourite created: ${favourite.length}`);
  console.log("Production Database seeded!");
};

module.exports = { seedTest, seedDev, seedProd };

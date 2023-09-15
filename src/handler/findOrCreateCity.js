const CityMongoose = require("../models/City");

module.exports = async (city) => {
  const cityDB = await CityMongoose.findOne({ name: city });
  if (cityDB) return cityDB;

  const newCity = await CityMongoose.create({
    name: city,
  });

  if (newCity) return newCity;

  throw Error("error in create City DATABASE");
};

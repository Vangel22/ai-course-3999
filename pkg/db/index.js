const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// ENVIRONMENT VARIABLES in config.env:
// PORT
// DATABASE
// DATABASE_PASSWORD

exports.init = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Successfully connected!");
  } catch (err) {
    console.log(err.message);
  }
};

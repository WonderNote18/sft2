require('dotenv').config();
const mongoose = require("mongoose");
const debug = require("debug")('sft2:server');

const MONGOURI = process.env.MONGO_URI;

const InitDB = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    debug("Connected to MongoDB");
  } catch (e) {
    debug(e);
    throw e;
  }
};

module.exports = InitDB;
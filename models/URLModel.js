const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const URLSchema = new Schema({
  originalURL: { type: String },
  shortenedURL: { type: String },
  user: { type: String },
});

const URL = mongoose.model("shorturls", URLSchema);

module.exports = URL;

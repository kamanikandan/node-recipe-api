const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  isFavourite: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recipes", recipeSchema);

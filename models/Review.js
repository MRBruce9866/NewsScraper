const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  author: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;

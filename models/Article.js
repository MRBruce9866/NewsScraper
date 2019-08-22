const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: Array,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: false
  },

  snippet: {
    type: String,
    required: true
  },

  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

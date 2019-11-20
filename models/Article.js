var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String,
  },
  summary: {
    type: String,
  },
  url: {
    type: String,
  },
  comment: {
    type: [Schema.Types.ObjectId],
    ref: "Comment"
  },
  saved: {
    type: Boolean,
    default: false
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;

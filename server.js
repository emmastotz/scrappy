// ====================================================
// DEPENDENCIES
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
// ====================================================
// PORT
var PORT = 3000;
// ====================================================
// REQUIRE ALL MODELS
var db = require("./models");
// ====================================================
// INITIALIZE EXPRESS
var app = express();
// ====================================================
// CONFIGURE MIDDLEWARE
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// ====================================================
// MONGO DB CONNECTION
mongoose.connect("mongodb://localhost/scrappy", { useNewUrlParser: true });
// ====================================================
// LISTENING
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
// ====================================================
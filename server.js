// ===================================================
// DEPENDENCIES
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
// ===================================================
// PORT
var PORT = process.env.PORT || 8000;
// ===================================================
// REQUIRE ALL MODELS
var db = require("./models");
// ===================================================
// INITIALIZE EXPRESS
var app = express();
// ===================================================
// CONFIGURE MIDDLEWARE
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// ===================================================
// HANDLEBARS
var exphbs = require("express-handlebars");
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
// ===================================================
// ROUTES
require("./routes/routes")(app);
// ===================================================
// MONGO DB CONNECTION
mongoose.connect("mongodb://localhost/scrappy", { useNewUrlParser: true });
// ===================================================
// LISTENING
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
// ===================================================
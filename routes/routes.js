// DEPENDENCIES
// ===================================================
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
// ===================================================
// ROUTES
// ===================================================
module.exports = function(app) {
  // ===================================================
  // Landing Page
  app.get("/", (req, res) => {
    res.render('index');
  });
  // ===================================================
  // My Articles Page
  app.get("/myarticles", (req, res) => {
      res.render("myarticles");
  });
  // ===================================================
  // GET Saved Articles from DB
  app.get("/savedarticles", (req, res) => {
    db.Article.find({saved: true}).then(data => {
      console.log(data);
      res.json(data);
    })
  });
  // ===================================================
  // Scrape New Articles
  app.get("/scrape", (req, res) => {
    axios.get("http://www.nytimes.com").then(function(response) {
      var $ = cheerio.load(response.data);
      console.log("Scraping...");

      // Find and loop through each element that has the ".assetWrapper" class
      $(".assetWrapper").each(function(i, element) {
        // Grab the headline of the article
        var head = $(this).find("h2").text().trim();
        // Grab the URL of the article
        var url = $(this).find("a").attr("href");
        // Grab the summary of the article
        var sum = $(this).find("p").text().trim();
        // So long as our headline and sum and url aren't empty or undefined, do the following
        if (head || sum || url) {
          // This section uses regular expressions and the trim function to tidy our headlines and summaries
          var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        };
        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.nytimes.com" + url
        };
        db.Article.create(dataToAdd)
        .catch(function(err) {
          console.log(err);
        })
      });
        console.log("Done scraping.");
        db.Article.find({}).then(result => {
          res.json(result);
        });
      });
    });
  // ===================================================
  // Saves a Comment to Particular Article
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(dbArticle) {
        res.json(dbArticle);
    })
      .catch(function(err) {
        res.json(err);
    });
  });
  // ===================================================
  // Saves an Article - SUPERFLUOUS?
  app.post("/articles/:id", function(req, res) {
    console.log(req.body);
    db.Article.updateOne({_id: req.params.id}, req.body)
      .then(function(data) {
        console.log(data)
        res.status(200);
    }).catch(function(err) {
      res.json(err);
    });
  });
  // ===================================================
  // Saves a New Comment
  app.post("/articles/:id/comments", function(req, res) {
    db.Comment.create(req.body, (err, val) => {
      db.Article.updateOne({_id: req.params.id},{$push: {"comment":val}}).then((data) => {
        res.send(data);
      });
    })
  });
  // ===================================================
  // View a Comment
  app.get("/articles/:id/comments", function(req,res){
    db.Article.findOne({_id : req.params.id})
    .then(function(data){
      console.log(data);
      db.Comment.find({_id: { $in: data.comment}})
      .then(function(data) {
        res.json(data);
      });
    });
  });
};
  // ===================================================
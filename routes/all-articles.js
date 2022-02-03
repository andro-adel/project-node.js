const express = require("express");
const router = express.Router();
const Article = require("../models/articleSchema");

// path start with "/all-articles"

// get request

router.get("/", (req, res) => {
  Article.find()
    .then((result) => {
      res.render("index", { mytitle: "HOME", arrArticle: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// post request

router.post("/", (req, res) => {
  const article = new Article(req.body);

  console.log(req.body);

  article
    .save()
    .then((result) => {
      res.redirect("/all-articles");
    })
    .catch((err) => {
      console.log(err);
    });
});

// get data by id

router.get("/:id", (req, res) => {
  // result =   object  inside mongo database

  Article.findById(req.params.id)
    .then((result) => {
      res.render("details", { mytitle: "ARTICLE DETAILS", objArticle: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete request

router.delete("/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then((params) => {
      res.json({ mylink: "/all-articles" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

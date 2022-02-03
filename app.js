const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//   for auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//   mongoose

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://andro:Dodo123456789@cluster0.j0tau.mongodb.net/project-node-js?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/home", (req, res) => {
//   res.send("<h1>Home Page</h1>");
// });

// app.get("/html", (req, res) => {
//   res.sendFile("views/index.ejs", { root: __dirname });
// });

// get request

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

// app.get("/all-articles", (req, res) => {
//   res.render("index", { mytitle: "Home" });
// });

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", { mytitle: "add-new-article" });
});

// post request

const Article = require("./models/articleSchema");

app.post("/all-articles", (req, res) => {
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

// get request

app.get("/all-articles", (req, res) => {
  Article.find()
    .then((result) => {
      res.render("index", { mytitle: "HOME", arrArticle: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get data by id

app.get("/all-articles/:id", (req, res) => {
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

app.delete("/all-articles/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then((params) => {
      res.json({ mylink: "/all-articles" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const allArticlesRouter = require("./routes/all-articles");

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

// app.get("/all-articles", (req, res) => {
//   res.render("index", { mytitle: "Home" });
// });

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", { mytitle: "add-new-article" });
});

// all-articles path

app.use("/all-articles", allArticlesRouter);

// 404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

const express = require("express");
const app = express();
const ip = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 8080;

const searchScholars4Dev = require("./scholars4Dev");
const searchScholars4DevPost = require("./scholars4DevPost");
const searchIndbeasiswa = require("./indbeasiswa");
const searchIndbeasiswaPost = require("./indbeasiswaPost");

app.get("/scholars4dev", (request, response) => {
  const page = request.query.page;

  if (page != null) {
    searchScholars4Dev(page).then((results) => {
      response.status(200);
      response.json(results);
    });
  } else {
    response.redirect("/scholars4dev?page=1");
  }
});

app.get("/scholars4dev/post", (request, response) => {
  const url = request.query.url;

  if (url != null) {
    searchScholars4DevPost(url).then((results) => {
      response.status(200);
      response.json(results);
    });
  } else {
    response.end();
  }
});

app.get("/indbeasiswa", (request, response) => {
  const page = request.query.page;

  if (page != null) {
    searchIndbeasiswa(page).then((results) => {
      response.status(200);
      response.json({ results, url });
    });
  } else {
    response.redirect("/indbeasiswa?page=1");
  }
});

app.get("/indbeasiswa/post", (request, response) => {
  const url = request.query.url;

  if (url != null) {
    searchIndbeasiswaPost(url).then((results) => {
      response.status(200);
      response.json({ results, url });
    });
  } else {
    response.end();
  }
});

app.get("/", (req, res) => res.send("Web Scraper by Wapp Lab"));

app.listen(port, ip);

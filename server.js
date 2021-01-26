const express = require("express");
const app = express();
const ip = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 8080;

const searchScholars4Dev = require("./scholars4Dev");
const searchScholars4DevPost = require("./scholars4DevPost");
const searchScholars4DevSitemap = require("./scholars4DevSitemap");
const searchScholars4DevCategory = require("./scholars4DevCategory");

const searchIndbeasiswa = require("./indbeasiswa");
const searchIndbeasiswaPost = require("./indbeasiswaPost");
const searchIndbeasiswaSitemap = require("./indbeasiswaSitemap");
const searchIndbeasiswaCategory = require("./indbeasiswaCategory");

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

app.get("/scholars4dev/sitemap", (request, response) => {
  let page = parseInt(request.query.page);
  if (!page) {
    page = 1;
  }
  searchScholars4DevSitemap().then((results) => {
    const pageCount = Math.ceil(Object.keys(results).length / 10);
    if (page > pageCount) {
      response.status(400);
      response.end();
    } else {
      response.status(200);
      response.json({
        page: page,
        pageCount: pageCount,
        posts: results.slice(page * 10 - 10, page * 10),
      });
    }
  });
});

app.get("/scholars4dev/category", (request, response) => {
  const url = request.query.url;

  if (url != null) {
    searchScholars4DevCategory(url).then((results) => {
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
      response.json(results);
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

app.get("/indbeasiswa/sitemap", (request, response) => {
  let page = parseInt(request.query.page);
  if (!page) {
    page = 1;
  }
  searchIndbeasiswaSitemap().then((results) => {
    const pageCount = Math.ceil(Object.keys(results).length / 10);
    if (page > pageCount) {
      response.status(400);
      response.end();
    } else {
      response.status(200);
      response.json({
        page: page,
        pageCount: pageCount,
        posts: results.slice(page * 10 - 10, page * 10),
      });
    }
  });
});

app.get("/indbeasiswa/category", (request, response) => {
  const url = request.query.url;

  if (url != null) {
    searchIndbeasiswaCategory(url).then((results) => {
      response.status(200);
      response.json(results);
    });
  } else {
    response.end();
  }
});

app.get("/", (req, res) => res.send("Scholarship Scraper by Wapp Lab"));

app.listen(port, ip);

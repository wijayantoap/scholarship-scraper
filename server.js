const express = require("express");
const app = express();
const ip = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 8080;

const searchScholars4Dev = require("./searchScholars4Dev");

app.get("/scholars4dev", (request, response) => {
  const page = request.query.page;

  if (page != null) {
    searchScholars4Dev(page).then((results) => {
      response.status(200);
      response.json(results);
    });
  } else {
    response.end();
  }
});

app.get("/", (req, res) => res.send("Web Scraper by Wapp Lab"));

app.listen(port, ip);

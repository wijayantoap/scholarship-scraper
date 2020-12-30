const puppeteerConfig = require("./puppeteerConfig");
const searchScholars4Dev = require("./scholars4Dev");

const puppeteer = puppeteerConfig();

const searchScholars4DevCategory = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  //turns request interceptor on
  await page.setRequestInterception(true);

  //if the page makes a  request to a resource type of image or stylesheet then abort thatrequest
  page.on("request", (request) => {
    if (
      request.resourceType() === "image" ||
      request.resourceType() === "stylesheet"
    )
      request.abort();
    else request.continue();
  });

  await page.goto(url);

  await page.waitForSelector("div[class=maincontent]");

  const searchResults = await page.$$eval(".entry", (results) => {
    let data = [];

    results.forEach((result) => {
      const title = result.querySelector("h2 > a").innerText;

      const url = result.querySelector("h2 > a").href;

      const details = result
        .querySelectorAll("div[class=post_column_1]")[0]
        .querySelector("p").innerText;

      const date = result
        .querySelectorAll("div[class=post_column_1]")[1]
        .querySelector("p").innerText;

      data.push({ title, url, details, date });
    });

    return data;
  });

  await browser.close();

  return searchResults;
};

module.exports = searchScholars4DevCategory;

const puppeteerConfig = require("./puppeteerConfig");

const puppeteer = puppeteerConfig();

const searchScholars4Dev = async (pageNumber) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(`https://www.scholars4dev.com/page/${pageNumber}/`);

  await page.waitForSelector("div[class=maincontent2]");

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

module.exports = searchScholars4Dev;

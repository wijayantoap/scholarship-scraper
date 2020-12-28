const puppeteer = require("puppeteer-extra");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Add adblocker plugin, which will transparently block ads in all pages you
// create using puppeteer.
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const searchScholars4Dev = async (pageNumber) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
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

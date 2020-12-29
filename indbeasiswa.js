const puppeteerConfig = require("./puppeteerConfig");

const puppeteer = puppeteerConfig();

const searchIndbeasiswa = async (pageNumber) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  await page.goto(`https://indbeasiswa.com/page/${pageNumber}?s=beasiswa)`);

  await page.waitForSelector("div[class=content-inner]");

  const searchResults = await page.$$eval(
    "div[class=post-right]",
    (results) => {
      let data = [];

      results.forEach((result) => {
        const title = result.querySelector("h2 > a").innerText;

        const url = result.querySelector("h2 > a").href;

        let details = result.querySelector(
          "div[class=post-content] > div[class=entry-content]"
        ).innerText;

        details = details.replace("- ", "");

        data.push({ title, url, details });
      });

      return data;
    }
  );

  await browser.close();

  return searchResults;
};

module.exports = searchIndbeasiswa;

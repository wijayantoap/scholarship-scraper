const puppeteerConfig = require("./puppeteerConfig");

const puppeteer = puppeteerConfig();

const searchIndbeasiswa = async (pageNumber) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  //turns request interceptor on
  await page.setRequestInterception(true);

  //if the page makes a  request to a resource type of image or stylesheet then abort that request
  page.on("request", (request) => {
    if (
      request.resourceType() === "image" ||
      request.resourceType() === "stylesheet"
    )
      request.abort();
    else request.continue();
  });

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

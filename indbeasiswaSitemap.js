const puppeteerConfig = require("./puppeteerConfig");

const puppeteer = puppeteerConfig();

const searchIndbeasiswaSitemap = async () => {
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

  await page.goto("https://indbeasiswa.com/sitemap");

  await page.waitForSelector("article");

  const searchResults = await page.$eval("article", (results) => {
    let data = [];

    results
      .querySelectorAll("div")[1]
      .querySelectorAll("ul")[1]
      .querySelectorAll("li")
      .forEach((result) => {
        const title = result.querySelector("a").innerText;

        const url = result.querySelector("a").href;

        data.push({ title, url });
      });

    return data;
  });

  await browser.close();

  return searchResults;
};

module.exports = searchIndbeasiswaSitemap;

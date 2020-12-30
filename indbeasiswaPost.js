const puppeteerConfig = require("./puppeteerConfig");

const puppeteer = puppeteerConfig();

const searchIndbeasiswaPost = async (url) => {
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

  const searchResults = await page.$eval("article", (result) => {
    let data = [];

    const title = result.querySelector("div > h1").innerText;
    let details = result.querySelector(
      "div[class=post-content] > div[class=entry-content]"
    ).innerHTML;

    data.push({ title, details });

    return data;
  });

  await browser.close();

  return searchResults;
};

module.exports = searchIndbeasiswaPost;

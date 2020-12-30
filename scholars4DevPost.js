const puppeteerConfig = require("./puppeteerConfig");

const puppeteer = puppeteerConfig();

const searchScholars4DevPost = async (url) => {
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

  const searchResults = await page.$eval("div[class=singlepost]", (result) => {
    let data = [];

    const title = result.querySelector("div[class='post clearfix'] > h1")
      .innerText;
    let date = result.querySelector(
      "div[class='post clearfix'] > p[class=postinfo]"
    ).innerText;
    const type = result
      .querySelectorAll(
        "div[class='entry clearfix'] > div[class=post_column_1]"
      )[0]
      .querySelector("p").innerText;
    const details = result.querySelector("div[class='entry clearfix']")
      .innerHTML;

    date = date.replace(" |", "");

    data.push({ title, date, type, details });

    return data;
  });

  await browser.close();

  return searchResults;
};

module.exports = searchScholars4DevPost;

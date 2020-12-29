const puppeteer = require("puppeteer-extra");

const puppeteerConfig = () => {
  // Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
  const StealthPlugin = require("puppeteer-extra-plugin-stealth");
  puppeteer.use(StealthPlugin());

  // Add adblocker plugin, which will transparently block ads in all pages you
  // create using puppeteer.
  const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

  return puppeteer;
};

module.exports = puppeteerConfig;

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function findDivIndex(targetUrl) {
  try {
    const browser = await puppeteer.launch({ 
      headless: false,
    });

    const page = await browser.newPage();

    await page.goto(targetUrl);

    // Scroll down by a constant height
    await page.evaluate((scrollHeight) => {
      window.scrollBy(0, scrollHeight);
    }, 800);

    await page.waitForTimeout(5000);
     
    for (let div_index = 1; div_index < 10; div_index++) {
      const currentXPath = `//*[@id="pageBodyContainer"]/div[1]/div[1]/div[1]/div[${div_index}]/div[1]/div[1]/section[1]/div[1]`;
      const elementHandle = await page.$x(currentXPath);

      // see if the div is found
      if (elementHandle.length > 0) {
        await browser.close();
        return div_index;
      } 
    }
    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function scrapeTargetWebsite() {
  const item = "salt";
  const zipcode = "10954";
  const Products = [];

  // Set Chrome options to run in headless modee
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--headless');
  chromeOptions.addArguments('--disable-gpu');
  chromeOptions.addArguments('--disable-extensions');
  chromeOptions.addArguments('--disable-software-rasterizer');
  chromeOptions.addArguments('--disable-notifications');
  chromeOptions.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

  // Initialize a Selenium WebDriver with Chrome options
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

    const divIndex = 0;

  try {
    // Define the URL of the target website
    const url = `https://www.target.com/s?searchTerm=${item}&tref=typeahead%7Cterm%7C${item}%7C%7C%7Chistory`;

    const divIndex = await findDivIndex(url);
    console.log("Index: ",divIndex);

    // Load the page
    await driver.get(url);

    // Define the scroll height in pixels
    let curr_height = 0; const scroll_height = 500;
    const max_scroll_height = await driver.executeScript("return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );");

    // loop through the number of elements we want
      for (let item_number = 1; item_number <= 25; item_number++) {
        console.log(item_number);
        try {
          console.log("Index inside code: ",divIndex);
          const xpath_type = `//*[@id="pageBodyContainer"]/div[1]/div[1]/div[1]/div[${divIndex}]/div[1]/div[1]/section[1]/div[1]/div[${item_number}]`;
          const xpath_element = await driver.wait(until.elementLocated(By.xpath(xpath_type), 1000));
          const element_type = await xpath_element.getText();

          console.log("found type", element_type);
          // advertisement is found
          if (element_type === "Sponsored") {continue;}

          // Split the string by newline characters
          const element_typeArray = element_type.split('\n');

          // Stores the elements in array
          Products.push(element_typeArray);

          // // const image_xpath = `//*[@id="pageBodyContainer"]/div[1]/div[1]/div[1]/div[${divIndex}]/div[1]/div[1]/section[1]/div[1]/div[${item_number}]/div[1]/div[1]/div[1]/div[1]/h3[1]/div[1]/div[1]/a[1]/div[1]/picture[1]/img[1]`;
          // // const image_element = await driver.findElement(By.xpath(image_xpath));
          // // const image_source = await image_element.getAttribute("src");

          // // // adds the image source
          // // element_typeArray.push(image_source);

          console.log(element_typeArray);

          // page scroll 
          if (max_scroll_height > curr_height) {
            await driver.executeScript(`window.scrollBy(0, ${scroll_height});`); await driver.sleep(0.5);
            curr_height += scroll_height;
          }

        } catch (error) {
          console.log(`${error}`);
        }
     }
  } finally {
    const outputFilePath = path.join(parsed.dir, 'scrapedData.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(Products, null, 2));
    await driver.quit();
  }
  return Products;
}

router.put(`/${parsed.name}`, async (req, res) => {
  try {
    // Call your web scraping function
    const scrapedData = await scrapeTargetWebsite();

    // Initialize an empty array to hold scraped data
    // const scrapedData = [];

    // // Example data for scraping (you can replace this with your actual web scraping logic)
    // const data1 = [
    //   "Haagen Dazs Strawberry Ice Cream Bar - 3pk",
    //   "Haagen-Dazs",
    //   "4.3 out of 5 stars with 180 ratings",
    //   "180",
    //   "SNAP EBT eligible",
    //   "$1.99 ($0.55/fluid ounce)",
    //   "at Spring Valley",
    //   "Shipping not available",
    //   "Not available at Spring Valley",
    //   "Check stores",
    // ];

    // const data2 = [
    //   "Breyers Homemade Strawberry Ice Cream - 48oz",
    //   "Breyers Ice Cream",
    //   "4.9 out of 5 stars with 120 ratings",
    //   "120",
    //   "SNAP EBT eligible",
    //   "$8.19 ($0.11/ounce)",
    //   "at Spring Valley",
    //   "Get it as soon as 1pm today with Shipt",
    //   "Ready within 2 hours with pickup",
    //   "Deliver it"
    // ];

    // // Push the data into the scrapedData array
    // scrapedData.push(data1);
    // scrapedData.push(data2);

    // Send the scraped data as a JSON response
    res.json(scrapedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from TARGET' });
  }
});

export default router;
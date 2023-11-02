import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

// checks if the given XPATH is valid or not
async function isXPathValid(xpath, driver) {
  try {
    await driver.findElement(By.xpath(xpath));
    return true;
  } catch (error) {
    return false;
  }
}

// Function to deduplicate data based on a unique identifier (index 0)
function deduplicateData(existingData, newData) {
  const uniqueIdentifiers = new Set(existingData.map(item => item[0]));
  const deduplicatedData = [...existingData];

  for (const newItem of newData) {
    if (!uniqueIdentifiers.has(newItem[0])) {
      deduplicatedData.push(newItem);
      uniqueIdentifiers.add(newItem[0]);
    }
  }

  return deduplicatedData;
}

async function scrapeHannafordWebsite(item_name) {
  const zipcode = "10954";
  const Products = [];

  // Set Chrome options to run in headless mode
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


  try {
    const url = `https://www.hannaford.com/search/product?form_state=searchForm&keyword=${item_name}&ieDummyTextField=&productTypeId=P`;

    // Load the page
    await driver.get(url);

    // Define the scroll height in pixels
    let curr_height = 0; const scroll_height = 800;
    const max_scroll_height = await driver.executeScript("return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );");
    await driver.executeScript(`window.scrollBy(0, ${scroll_height});`);
    curr_height = curr_height + 500;

    const productNameElements = await driver.findElements(By.xpath('//*[@id="thumbnail-container"]//div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/span[1]'));
    const productPriceElementsString = await driver.findElement(By.xpath('//*[@id="thumbnail-container"]//div[1]/div[1]/div[1]/div[2]/div[2]/div[1]'));
    
    // const productSize = await driver.findElement(By.xpath('//*[@id="thumbnail-container"]//div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]')).getText();
    // const productPerPound = await driver.findElement(By.xpath('//*[@id="thumbnail-container"]//div[1]/div[1]/div[1]/div[2]/div[2]/p[1]')).getText();

    for (const productNameElement of productNameElements) {
      const productName = await productNameElement.getText();
      Products.push([productName, "N/A"]);
    }

  } finally {
    await driver.quit();
  }
  return Products;
}

router.put(`/${parsed.name}`, async (req, res) => {
  try {
    const items = req.body.items;
    const address = req.body.address;

    const data = await scrapeHannafordWebsite(items[0]);

    // stores the data
    const storageSubfolder = 'storage'; 
    const targetSubfolder = 'hannaford';
    const fileName = path.join(parsed.dir, storageSubfolder, targetSubfolder, `${items[0]}.json`);

    // Check if the file exists
    if (fs.existsSync(fileName)) {
      // Load the existing data from the file
      const existingData = JSON.parse(fs.readFileSync(fileName));

      // Merge and deduplicate the data (based on a unique identifier)
      const newData = deduplicateData(existingData, data);

      // Save the merged data back to the file
      fs.writeFileSync(fileName, JSON.stringify(newData, null, 2));
    } else {
      // If the file doesn't exist, create it with the scraped data
      fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }

    res.json(data);

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from HANNAFORD' });
  }
});

export default router;
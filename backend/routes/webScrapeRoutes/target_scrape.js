import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
async function scrapeTargetWebsite() {
  const item = "icecream";
  const zipcode = "10954";

  // Set Chrome options to run in headless mode
  const chromeOptions = new chrome.Options();
  // chromeOptions.addArguments('--headless');
  chromeOptions.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
  // Initialize a Selenium WebDriver with Chrome options
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

  try {
    // Define the URL of the target website
    const url = `https://www.target.com/s?searchTerm=${item}&tref=typeahead%7Cterm%7C${item}%7C%7C%7Chistory`;

    // Load the page
    await driver.get(url);

    // Define the scroll height in pixels (adjust as needed)
    let curr_height = 0;
    const scroll_height = 500;
    const item_data = [];
    const max_scroll_height = await driver.executeScript("return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );");

    // Loop through the elements and extract data
    for (let item_number = 1; item_number <= 5; item_number++) {
      console.log(item_number);

      try {
        // Construct XPath for the product name
        const xpath_name_item = `//*[@id="pageBodyContainer"]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/section[1]/div[1]/div[${item_number}]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]`;

        // Construct XPath for the item price
        const xpath_name_price = `//*[@id="pageBodyContainer"]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/section[1]/div[1]/div[${item_number}]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]/span[1]`;

        if (max_scroll_height > curr_height) {
          await driver.executeScript(`window.scrollBy(0, ${scroll_height});`);
          await driver.sleep(0.5);
          curr_height += scroll_height;
        }

        // Attempt to locate the elements, but with a timeout of 10 seconds
        const name_element = await driver.wait(until.elementLocated(By.xpath(xpath_name_item), 10));
        const price_element = await driver.wait(until.elementLocated(By.xpath(xpath_name_price), 10));

        // Extract the data
        const item_name = await name_element.getText();
        const item_price = await price_element.getText();

        // Check if both name and price are found
        if (item_name && item_price) {
          // Remove or replace special characters
          const decodedItemName = item_name.replace(/\\u([\d\w]{4})/gi, (match, group) => String.fromCharCode(parseInt(group, 16)));
          
          // Create a dictionary for each item and add it to the list
          item_data.push({
            'item_name': decodedItemName.trim(),
            'item_price': item_price.trim(),
          });
        } else {
          // If either name or price is missing, skip this index
          console.log(`Skipping product ${item_number} due to missing data.`);
        }
      } catch (error) {
        console.log(`Error processing product ${item_number}: ${error}`);
      }
    }

    return item_data;
  } finally {
    // Close the WebDriver
    await driver.quit();
  }
}

router.put(`/${parsed.name}`, async (req, res) => {
  try {
    // Call your web scraping function
    const scrapedData = await scrapeTargetWebsite();

    // Send the scraped data as a JSON response
    res.json(scrapedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from TARGET' });
  }
});

export default router;
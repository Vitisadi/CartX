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

async function scrapeCVSWebsite(item_name) {
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
    const url = `https://www.cvs.com/search?searchTerm=${item_name}`;

    // Load the page
    await driver.get(url);

    // Define the scroll height in pixels
    let curr_height = 0; const scroll_height = 800;
    const max_scroll_height = await driver.executeScript("return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );");
    await driver.executeScript(`window.scrollBy(0, ${scroll_height});`);
    curr_height = curr_height + 400;

    let foundValidXPath = false;
    let check_index = 1;

    for (let row_number = 1; row_number < 5; row_number++) {
      for (let col_number = 2; col_number < 10; col_number++){
         try {
         let xpath_type = `/html/body/div[1]/div/div/div/div[2]/div/div[1]/div/div/main/div[2]/div[2]/div[3]/div/div/div/div/div/div/div/div[${col_number}]/div/div/div[${row_number}]/div/div/div/div/div/div[2]`;
         let isValid = await isXPathValid(xpath_type, driver);

         if (!isValid){
            continue
         }
         
         const xpath_element = await driver.wait(until.elementLocated(By.xpath(xpath_type), 1000));
         const element_type = await xpath_element.getText();

         // valid value is found
         if (element_type.length > 0){
               const image_xpath = `/html/body/div[1]/div/div/div/div[2]/div/div[1]/div/div/main/div[2]/div[2]/div[3]/div/div/div/div/div/div/div/div[${col_number}]/div/div/div[${row_number}]/div/div/div/div/div/div[1]/div[1]/div[1]/img`;
               const image_element = await driver.findElement(By.xpath(image_xpath));
               const image_source = await image_element.getAttribute("src");

               // Split the string by newline characters
               let element_typeArray = element_type.split('\n');

               // Remove unnecessary data
               element_typeArray.splice(2, 1);
               element_typeArray = element_typeArray.filter(element => {
                  return !element.startsWith("Pickup") && 
                        !element.startsWith("Check more") &&
                        !element.startsWith("Out of stock at") && 
                        !element.startsWith("Shipping");
               });

               // adds the image source
               element_typeArray.push(image_source)

               // Stores the elements in array
               Products.push(element_typeArray);
         }
         
         // page scroll 
         if (max_scroll_height > curr_height) {
            await driver.executeScript(`window.scrollBy(0, ${scroll_height});`); await driver.sleep(1.5);
            curr_height += scroll_height;
         }

         } catch (error) {
         console.log(`${error}`);
         }
      }
    }
  // -------------------------------------------------------------------------------------------------------------------------

  } finally {
    await driver.quit();
  }
  return Products;
}

router.put(`/${parsed.name}`, async (req, res) => {
  try {
    const item = req.body.item;
    const address = req.body.address;

    const data = await scrapeCVSWebsite(item);

    // stores the data
    const storageSubfolder = 'storage'; 
    const targetSubfolder = 'cvs';
    const fileName = path.join(parsed.dir, storageSubfolder, targetSubfolder, `${item}.json`);

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
    res.status(500).json({ error: 'Failed to fetch data from SHOPRITE' });
  }
});

export default router;
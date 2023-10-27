import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import axios from 'axios';
import { load } from 'cheerio';

const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

// async function scrapeWalmart(item) {
//   const { data } = await axios.get(`https://www.walmart.com/search?q=${item}`);
  
//   const $ = load(data);

//   const items = [];
//   $('.search-result-item').each((index, element) => {
//     const name = $(element).find('.item-title').text();
//     const price = $(element).find('.item-price').text();

//     items.push({ name, price });
//   });

//   return items;
// }

router.put(`/${parsed.name}`, async (req, res) => {
  try {
    // Initialize an empty array to hold scraped data
    const scrapedData = [];

    // Example data for scraping (you can replace this with your actual web scraping logic)
    const data1 = [
      "Haagen Dazs Strawberry Ice Cream Bar - 3pk",
      "Haagen-Dazs",
      "4.3 out of 5 stars with 180 ratings",
      "180",
      "SNAP EBT eligible",
      "$1.99 ($0.55/fluid ounce)",
      "at Spring Valley",
      "Shipping not available",
      "Not available at Spring Valley",
      "Check stores",
    ];

    const data2 = [
      "Breyers Homemade Strawberry Ice Cream - 48oz",
      "Breyers Ice Cream",
      "4.9 out of 5 stars with 120 ratings",
      "120",
      "SNAP EBT eligible",
      "$8.19 ($0.11/ounce)",
      "at Spring Valley",
      "Get it as soon as 1pm today with Shipt",
      "Ready within 2 hours with pickup",
      "Deliver it"
    ];

    // Push the data into the scrapedData array
    scrapedData.push(data1);
    scrapedData.push(data2);

    // Send the scraped data as a JSON response
    res.json(scrapedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from TARGET' });
  }
});

export default router;
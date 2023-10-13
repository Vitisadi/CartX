import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

// Here I will write the function that gets the data from the target website
async function scrapeTargetWebsite() {
  const data = [
      {
          "item_name": "Ben & Jerry's Peanut Butter World Chocolate Ice Cream - 16oz",
          "item_price": "$4.99"
      },
      {
          "item_name": "Mint Cookies & Cream Ice Cream - 48oz - Favorite Day™",
          "item_price": "$3.49"
      },
      {
          "item_name": "Mint Chocolate Chip Ice Cream - 1.5qt - Favorite Day™",
          "item_price": "$3.49"
      },
      {
          "item_name": "Cookies & Cream Ice Cream - 1.5qt - Favorite Day™",
          "item_price": "$3.49"
      },
      {
          "item_name": "Chocolate Chunk Frozen Ice Cream Sandwich - 4pk/20oz - Favorite Day™",
          "item_price": "$4.99"
      },
      {
          "item_name": "Breyers Vanilla Chocolate Strawberry Ice Cream - 48oz",
          "item_price": "$5.29"
      }
  ];
  return data;
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
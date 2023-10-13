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
  const items = req.body.items;
  const address = req.body.address;

  // try {
  //   const data = await scrapeWalmart("Ice+Cream");
  //   res.send(data);
  // } catch (error) {
  //   console.error("Error scraping Walmart:", error);
  //   res.status(500).send("Failed to scrape data");
  // }

  const data = [
    {
      item: "orange",
      price: 1,
    },
    {
      item: "berry",
      price: 0.5,
    },
  ];

  res.send(data);
});

export default router;

import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.put(`/${parsed.name}`, async (req, res) => {
  try {
    const item = req.body.item;

    if (!item) {
      return res.status(400).json({ error: 'Item is required' });
    }

    const storesResponse = await axios.put('http://localhost:8080/nearbyStores');
    const stores = storesResponse.data.stores;

    let promises = stores.map(store => {
      return axios.put(`http://localhost:8080/${store}`, { item: item })
        .then(response => {
          return { store: store, data: response.data };
        })
        .catch(error => {
          console.warn(`Failed to send data for store: ${store}`);
          return { store: store, error: error.message };
        });
    });

    let results = await Promise.all(promises);
    let formattedResults = results.reduce((acc, curr) => {
      acc[curr.store] = curr.data || curr.error;
      return acc;
    }, {});

    res.json(formattedResults);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
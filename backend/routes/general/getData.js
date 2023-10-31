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
    const { items, userAddress } = req.body;

    if (!userAddress) {
      return res.status(400).json({ error: 'Address is required' });
    }

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'List of items is required' });
    }

    const storesResponse = await axios.put(`http://localhost:8080/nearbyStores`, {
              address: userAddress
          });

    const stores = storesResponse.data;
    console.log(stores);
    exit();
    
    let results = {}
    const promises = [];
    for (const store of stores) {
        let storeAddress = store.address
        const promise = axios.put(`http://localhost:8080/${store.name}`, {
            items: items,
            address: storeAddress
        })
        .then(response => {
            results[store] = response.data; 
        })
        .catch(error => {
            console.warn(`Failed to send data for store: ${store}`); 
        });

        promises.push(promise); 
    }

    await Promise.all(promises);

    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;

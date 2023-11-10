import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

function isSupported(inputStoreName) {
  // i = case-insensitive
  const storePatterns = [
    /Target/i, 
    /Hannaford/i,
    /Shoprite/i,
    /CVS/i,
  ];

  // Search for a match
  for (const pattern of storePatterns) {
    const match = inputStoreName.match(pattern);
    // If found, return
    if (match) {
      return match[0]; 
    }
  }

  return null;
}

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

    const stores =storesResponse.data;
    
    let results = {}
    const promises = [];
    const processedStores = new Set();
    stores.forEach(store => {
      let storeAddress = store.address;

      // Skip not supporting stores or already processed
      const matchedStoreName = isSupported(store.name);
      if (!matchedStoreName || processedStores.has(matchedStoreName)) {
        return
      }

      processedStores.add(matchedStoreName);

      console.log(`Now running ${matchedStoreName}`)

      const promise = axios.put(`http://localhost:8080/${matchedStoreName}`, {
        items: items,
        address: storeAddress
      })
      .then(response => {
        results[store] = response.data; 
      })
      .catch(error => {
        console.warn(`Failed to send data for store: ${store.name} with a match of ${matchedStoreName}`); 
      });

      promises.push(promise); 
    });
    
    await Promise.all(promises);

    console.log(results);
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;
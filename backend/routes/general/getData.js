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
    const { stores } = req.body;
    console.log("Received stores:", stores);

    if (!stores || !Array.isArray(stores)) {
      return res.status(400).json({ error: 'List of stores is required' });
    }

    const results = {};

    for (const store of stores) {
      try {
        const response = await axios.get(`http://localhost:8080/${store}`);
        results[store] = response.data;
      } catch (error) {
        console.warn(`Failed to fetch data for store: ${store}`);
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;

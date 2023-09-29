import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.put(`/${parsed.name}`, (req, res) => {
  const { zipCode } = req.body;

  if (!zipCode) {
    return res.status(400).json({ error: 'ZipCode is required' });
  }

  require('dotenv').config(); // Load environment variables from .env file

  // Access your API key
  const apiKey = process.env.API_KEY;

  // Define the endpoint for the Nearby Search request
  const endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  // Define your search parameters
  const location = 'latitude,longitude'; // Replace with the coordinates of your location
  const radius = '500'; // Radius in meters
  //const keyword; tbd













  const sampleStores = [
    'exampleAPI',
    'target',
    'exampleScrape',
  ];

  res.json({ stores: sampleStores });
});

export default router;

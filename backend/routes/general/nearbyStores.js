import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.put(`/${parsed.name}`, (req, res) => {
  const { zipCode } = req.body;

  if (!zipCode) {
    return res.status(400).json({ error: 'ZipCode is required' });
  }

  dotenv.config(); // Load environment variables from .env file

  // Access your API key
  const apiKey = process.env.API_KEY;

 // Search Parameters
 const location = '42.7299%2C73.6767'; // Using RPI Union as a base location to test API use
 const radius = '10000'; // Radius in meters
 const type = 'store' //Using grocery stores as key word

  // API URL for Nearby Search request
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;
  
  fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Log the JSON response to the console
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  
  









  const sampleStores = [
    'exampleAPI',
    'target',
    'exampleScrape',
  ];

  res.json({ stores: sampleStores });
});

export default router;

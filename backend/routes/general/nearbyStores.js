import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);


router.put(`/${parsed.name}`, (req, res) => {
  let storeArray = [];

  async function fetchPlaces(apiUrl, nextPageToken = null, apiKey){
    if (nextPageToken != null){
      apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${apiKey}`;
    }

    await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (const store of data.results){
        const current = {
          name: store.name,
          address: store.vicinity,
        };
        storeArray.push(current);
      }

      if (data.next_page_token && storeArray.length<60){
        setTimeout(() => {    //Next page token requires a few seconds before use or results in invalid request
          fetchPlaces(apiUrl, data.next_page_token, apiKey);
        }, 2000);
      }
      else{
        console.log(storeArray.length);
        const storeData = JSON.stringify(storeArray, null, 2);
        res.json(storeData);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  const { zipCode } = req.body;

  if (!zipCode) {
    return res.status(400).json({ error: 'ZipCode is required' });
  }

  dotenv.config();
  // Access your API key
  const apiKey = process.env.API_KEY;

  //This code is to convert the zip code to latitute and longitude coordinates
  //**********may implement using address as another option
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    return response.json();
  })
  .then((coordinates) => {

    const lat = coordinates.results[0].geometry.location.lat;
    const lng = coordinates.results[0].geometry.location.lng;

    // Search Parameters
    const location = lat + "%2C" + lng; // Using RPI Union as a base location to test API use
    const type = 'store' //Using store as key word

    // API URL for Nearby Search request
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=${type}&location=${location}&rankby=distance&key=${apiKey}`
    fetchPlaces(apiUrl, null, apiKey);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


});

export default router;

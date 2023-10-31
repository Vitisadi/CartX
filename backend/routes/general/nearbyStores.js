import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.put(`/${parsed.name}`, async (req, res) => {
  let storeArray = [];


  async function fetchCoordinates(googleKey, address){
    //This code is to convert the zip code to latitute and longitude coordinates
    //**********may implement using address as another option
    let response;
    try {
      response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`);
    } catch (e) {
      console.error('Error:', e);
    }

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const coordinates = await response.json();

    const lat = coordinates.results[0].geometry.location.lat;
    const lng = coordinates.results[0].geometry.location.lng;

    return lat + "%2C" + lng;
  }



  //fetchDistance Function returns distance and travel time
  async function fetchDistance(bingKey, startCoords, endCoords){
    let response;

    try{
      response = await fetch(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${startCoords}&destinations=${endCoords}&travelMode=driving&key=${bingKey}&distanceUnit=mi`)
    }catch(e){
      console.error('Error:', error);
    }

    if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
    }

    const distance = await response.json();
    
    const dist = distance.resourceSets[0].resources[0].results[0].travelDistance;
    const time = distance.resourceSets[0].resources[0].results[0].travelDuration;

    return [dist, time];
    
  }



  //fetchPlaces creates the array of stores and makes them a JSON 
  async function fetchPlaces(apiUrl, nextPageToken = null, googleKey, location){
    if (nextPageToken != null){
      apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${googleKey}`;
    }

    await fetch(apiUrl)
    let response;
    try{
      response = await fetch(apiUrl)
    }catch(e){
      console.error('Error:', error);
    }

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    
    const data = await response.json();
    
    const bingKey = process.env.BING_KEY;
    /*
      For every store given, we need:
      1. Name
      2. Address
      3. Distance in Miles
      4. Travel time
    */
    for (const store of data.results){
      const end_coord = store.geometry.location.lat + "%2C" + store.geometry.location.lng;
      const [distance, travelTime] = await fetchDistance(bingKey, location, end_coord);

      const current = {
        name: store.name,
        address: store.vicinity,
        distance: distance,
        time: travelTime,
      };
      storeArray.push(current);
    }

    if (data.next_page_token && storeArray.length<60){
      setTimeout(() => {    //Next page token requires a few seconds before use or results in invalid request
        fetchPlaces(apiUrl, data.next_page_token, googleKey, location);
      }, 2000);
    }
    else{
      storeArray.sort((a,b) => {
        return a.distance - b.distance
      });
      const storeData = JSON.stringify(storeArray, null, 2);
      res.json(storeData);
    }
  }


  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'ZipCode is required' });
  }

  dotenv.config();
  // Access your API key
  const googleKey = process.env.API_KEY;
  // Search Parameters
  const location = await fetchCoordinates(googleKey, address);
  const type = 'store' //Using store as key word


  // API URL for Nearby Search request
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=${type}&location=${location}&rankby=distance&key=${googleKey}`;
  fetchPlaces(apiUrl, null, googleKey, location);
});

export default router;
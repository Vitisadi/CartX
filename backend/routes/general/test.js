import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.BING_KEY;

const startCoords = [42.73787996493268, -73.66960108280182]; // Rite Aid
const endCoords = [42.745781, -73.638741]; // Walmart


await fetch(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${startCoords}&destinations=${endCoords}&travelMode=driving&key=${apiKey}&distanceUnit=mi`)
.then((response) => {
    if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
    })
    .then((distance) => {
        console.log("Distance: " + distance.resourceSets[0].resources[0].results[0].travelDistance + " miles");
        console.log("Travel Time: " + distance.resourceSets[0].resources[0].results[0].travelDuration + " minutes");

    })
    .catch((error) => {
        console.error('Error:', error);
    });

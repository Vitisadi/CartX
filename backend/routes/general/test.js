import express from 'express';
import fetch from 'node-fetch'; // You need to import fetch for Node.js
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

// Function to geocode address
async function geocodeAddress(address, apiKey) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            const lat = data.results[0].geometry.location.lat;
            const lng = data.results[0].geometry.location.lng;
            return { lat, lng };
        } else {
            console.log('Geocoding failed:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Function to find nearby stores
async function findNearbyStores(lat, lng, apiKey, brands) {
    const radius = 24140; // Search radius in meters (15 miles)
    let storesByBrand = {};

    for (const brand of brands) {
        storesByBrand[brand] = [];

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${brand}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                storesByBrand[brand] = data.results.slice(0, 5).map(store => ({
                    name: store.name,
                    address: store.vicinity,
                    latitude: store.geometry.location.lat,
                    longitude: store.geometry.location.lng
                }));
            }
        } catch (error) {
            console.error(`Error fetching data for ${brand}:`, error);
        }
    }

    return storesByBrand;
}

// PUT route to get nearby stores
router.put(`/${parsed.name}`, async (req, res) => {
    const address = req.body.userAddress;
    const apiKey = ''; // Replace with your Google Maps API key

    try {
        const coords = await geocodeAddress(address, apiKey);
        if (coords) {
            const brands = ['Target', 'ShopRite', 'CVS'];
            const nearbyStores = await findNearbyStores(coords.lat, coords.lng, apiKey, brands);
            res.json(nearbyStores);
        } else {
            res.status(400).json({ error: 'Failed to geocode address' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

// const data = 
// {
//     Target: [
//       {
//         name: 'Target',
//         address: '1440 Central Ave, Colonie',
//         latitude: 42.7053438,
//         longitude: -73.8239796
//       },
//       {
//         name: 'Target',
//         address: '26 Crossing Blvd, Clifton Park',
//         latitude: 42.8568383,
//         longitude: -73.77222259999999
//       },
//       {
//         name: 'Target',
//         address: '625 3rd Ave Ext, Rensselaer',
//         latitude: 42.64506530000001,
//         longitude: -73.7008209
//       },
//       {
//         name: 'Target',
//         address: '204 Saratoga Rd, Schenectady',
//         latitude: 42.8667793,
//         longitude: -73.93054959999999
//       },
//       {
//         name: 'Target',
//         address: '675 Troy-Schenectady Rd, Latham',
//         latitude: 42.756392,
//         longitude: -73.7703944
//       }
//     ],
//     ShopRite: [
//       {
//         name: 'ShopRite of North Greenbush',
//         address: '102 Van Rensselaer Square, North Greenbush',
//         latitude: 42.6567291,
//         longitude: -73.69053339999999
//       },
//       {
//         name: 'ShopRite of Colonie',
//         address: '1730 Central Ave, Colonie',
//         latitude: 42.7242056,
//         longitude: -73.84392799999999
//       },
//       {
//         name: 'ShopRite of Niskayuna',
//         address: '2333 Nott St E, Niskayuna',
//         latitude: 42.8166764,
//         longitude: -73.8899113
//       },
//       {
//         name: 'ShopRite of Slingerlands',
//         address: '41 Vista Blvd, Slingerlands',
//         latitude: 42.6417818,
//         longitude: -73.86274130000001
//       },
//       {
//         name: 'ShopRite of Albany',
//         address: '709 Central Ave, Albany',
//         latitude: 42.6772682,
//         longitude: -73.78437079999999
//       }
//     ],
//     CVS: [
//       {
//         name: 'CVS',
//         address: '885 Central Ave, Albany',
//         latitude: 42.6808934,
//         longitude: -73.7897708
//       },
//       {
//         name: 'CVS',
//         address: '750 Loudon Rd, Latham',
//         latitude: 42.742814,
//         longitude: -73.7623371
//       },
//       {
//         name: 'CVS',
//         address: '26 Crossing Blvd, Clifton Park',
//         latitude: 42.8568383,
//         longitude: -73.77222259999999
//       },
//       {
//         name: 'CVS',
//         address: '16 New Scotland Ave, Albany',
//         latitude: 42.6534282,
//         longitude: -73.7732419
//       },
//       {
//         name: 'CVS',
//         address: '1204 Eastern Ave, Schenectady',
//         latitude: 42.8072603,
//         longitude: -73.9147156
//       }
//     ]
//   }
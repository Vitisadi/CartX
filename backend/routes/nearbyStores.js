import express from 'express';
const router = express.Router();

router.put('/nearbyStores', (req, res) => {
  const { zipCode } = req.body;

  if (!zipCode) {
    return res.status(400).json({ error: 'ZipCode is required' });
  }

  const sampleStores = [
    'Store 1',
    'Store 2',
    'Store 3',
    'Store 4',
  ];

  res.json({ stores: sampleStores });
});

export default router;

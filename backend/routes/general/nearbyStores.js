import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.put(`/${parsed.name}`, (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'ZipCode is required' });
  }

  const sampleStores = [
    'target'
  ];

  res.json({ stores: sampleStores });
});

export default router;
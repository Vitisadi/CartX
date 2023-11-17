import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
// import dotenv from 'dotenv';
// import fetch from 'node-fetch';
// import { DateRange } from '@mui/icons-material';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.put(`/${parsed.name}`, async (req, res) => {

  const sampleStores = [
    'shoprite',
    'target',
    'cvs'
  ];

  res.json({ stores: sampleStores });

});

export default router;

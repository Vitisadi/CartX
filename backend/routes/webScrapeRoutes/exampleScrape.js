import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.get(`/${parsed.name}`, (req, res) => {
  const items = req.body.items;
  
  const data = [
    {
      item: "orange",
      price: 1,
    },
    {
      item: "berry",
      price: 0.5,
    },
  ];

  res.send(data);
});

export default router;

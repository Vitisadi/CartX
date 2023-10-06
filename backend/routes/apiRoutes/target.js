import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.put(`/${parsed.name}`, (req, res) => {
  const items = req.body.items;
  
  const data = [
    {
      item: "ice cream",
      price: 100,
    },
    {
      item: "pretzel",
      price: 10000,
    },
  ];

  res.send(data);
});

export default router;

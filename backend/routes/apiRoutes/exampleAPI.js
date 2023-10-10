import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.put(`/${parsed.name}`, (req, res) => {
  const items = req.body.items;
  const address = req.body.address;

  const data = [
    {
      item: "apple",
      price: 5,
    },
    {
      item: "banana",
      price: 3,
    },
  ];

  res.send(data);
});

export default router;

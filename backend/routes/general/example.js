import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

router.get(`/${parsed.name}`, (req, res) => {
  const data = [
    {
      id: 1,
      name: 'joe',
    },
    {
      id: 2,
      name: 'bobb',
    },
    {
      id: 3,
      name: 'smith',
    },
  ];

  res.send(data);
});

export default router;

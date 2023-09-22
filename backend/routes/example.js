import express from 'express';
const router = express.Router();

router.get('/example', (req, res) => {
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

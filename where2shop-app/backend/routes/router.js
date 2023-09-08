import express from 'express'; 
const router = express.Router();

router.get('/exampleRoute', (req, res) => {
    const data = 
    [
        {
            "id": 1,
            "name": "joe"
        },
        {
            "id": 2,
            "name": "bob"
        },
        {
            "id": 3,
            "name": "smith"
        }
    ];

    res.send(data);
});

export default router;
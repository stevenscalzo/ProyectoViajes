const express = require('express');
const travelsController = require('../../controllers/travels');
const router = express.Router();


router.get('/', async (req, res) => {
    let travels = await travelsController.getTravel();
    res.send(travels);
});



router.post('/', async (req, res) => {
    let result = await travelsController.addTravel(req.body);
    res.send(result);
})

module.exports = router;
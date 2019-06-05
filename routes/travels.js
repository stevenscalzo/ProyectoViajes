const express = require('express');
const travelsController = require('../controllers/travels');
const router = express.Router();

// Listado de viajes
router.get('/', async (req, res) => {
    let travels = await travelsController.getTravel();

    res.render('travels/travels', {
        travels
    });
});

// Listado de viajes con login
router.get('/login', async (req, res) => {
    let travels = await travelsController.getTravel();

    res.render('travels/travelsLogin', {
        travels
    });
});

// Listado de viajes como Admin
router.get('/admin', async (req, res) => {
    let travels = await travelsController.getTravel();

    res.render('travels/travelsAdmin', {
        travels
    });
});

// Post que se llama desde el formulario
router.post('/', async (req, res) => {
    let result = await travelsController.addTravel(req.body);

    res.render('travels/added', {result});
})

router.get('/add', (req, res) => {
    res.render('travels/add');
})








module.exports = router;
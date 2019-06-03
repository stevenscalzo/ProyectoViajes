const express = require('express');
const travelsController = require('../models/modelosViajes');

const router = express.Router();

// Listado de viajes
router.get('/', async (req, res) => {
    let Viajes = await travelsController.getTravel();

    res.render('travels/travels', {
        Viajes
    });
});

// Listado de viajes con login
router.get('/login', async (req, res) => {
    let Viajes = await travelsController.getTravel();

    res.render('travels/travelsLogin', {
        Viajes
    });
});

// Listado de viajes como Admin
router.get('/admin', async (req, res) => {
    let Viajes = await travelsController.getTravel();

    res.render('travels/travelsAdmin', {
        Viajes
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
const express = require('express');
const travelsController = require('../controllers/travels');
const imagensController = require('../controllers/travelImage');
const router = express.Router();
const uploads = require('../config/multer');
const { isAdmind } = require('../middlewares/isAdmind');
const imagenControles = require('../controllers/travelImage');

// Listado de viajes
router.get('/', async (req, res) => {
    let travels = await travelsController.getTravels();
    console.log(travels);
    res.render('travels/travels', {
        travels
    });
});

// Listado de viajes con login
router.get('/login', async (req, res) => {
    let travels = await travelsController.getTravels();

    res.render('travels/travelsLogin', {
        travels
    });
});

// Listado de viajes como Admin
router.get('/admin', isAdmind, async (req, res) => {
    let travels = await travelsController.getTravels();

    res.render('travels/travelsAdmin', {
        travels
    });
});

// Post que se llama desde el formulario
router.post('/', isAdmind, uploads.array('imagen', 10), async (req, res) => {
    
    console.log("file " );

    let imagens = req.files;
    let result = req.body;
    let userId = req.session.userId;
    
    
    let travel = await travelsController.addTravel(result, userId);
    let imagenes = await imagenControles.addTraveslId(imagens, travel.id);


    await imagensController.addImagens(imagenes, travel.id);
    res.render('travels/added', {travel});
})


router.get('/add', isAdmind, (req, res) => {
    res.render('travels/add');
})








module.exports = router;
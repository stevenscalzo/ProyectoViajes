const express = require('express');
const travelsController = require('../controllers/travels');
const imagensController = require('../controllers/travelImage');
const router = express.Router();
const uploads = require('../config/multer');
const { isAdmind } = require('../middlewares/isAdmind');
//const window = require('')

// Listado de viajes
router.get('/', async (req, res) => {
    let travels = await travelsController.getTravels();
    res.render('travels/travels', {
        travels
    });
});



// Post que se llama desde el formulario
router.post('/', isAdmind, uploads.array('imagen', 10), async (req, res) => {

    let imagens = req.files;
    let result = req.body;
    let userId = req.session.userId;


    let travel = await travelsController.addTravel(result, userId);
    let travelimagenes = await imagensController.addTraveslId(imagens, travel.id);
    let travelId = travel.id;

    let imagenes = await imagensController.addImagens(travelimagenes, travel.id);
    res.render('travels/elegirimagen', {
        imagenes,
        travelId
    });
    
})


router.get('/add', isAdmind, (req, res) => {
    res.render('travels/add');
})

router.get('/:id', async (req, res) => {
    let travelId = req.params.id
    console.log(travelId);
    let travelDetalles = await travelsController.travel(travelId);
    console.log(travelDetalles);
    let travel = travelDetalles[0].dataValues;
    let inicio = travel.fecha_inicio.toDateString();
    let fin = travel.fecha_fin.toDateString();
    res.render('travels/detalles', {
        travel,
        inicio,
        fin
    });
});

router.get('/:id/editar', isAdmind, async (req, res) => {
    let travelId = req.params.id
    let travelDetalles = await travelsController.travel(travelId);
    let travel = travelDetalles[0].dataValues;
    let inicio = travel.fecha_inicio.toDateString();
    let fin = travel.fecha_fin.toDateString();
    res.render('travels/editar', {
        travel,
        inicio,
        fin
    });
});

router.post('/:id/travelimagen', isAdmind, async (req, res) => {
    console.log("leyendo");
    let travelId = req.params.id
    let imagenes = await imagensController.getImagenes(travelId);

    res.render('travels/elegirimagen', {
        imagenes,
        travelId
    });
});

router.post('/travelimagen/:id', isAdmind, async (req, res) => {
    let travelId = req.params.id
    let oldImagenes = await imagensController.getImagenes(travelId);
    let checkbox = req.body
    let valorImagen = Object.values(checkbox);
    console.log(valorImagen);

    await  imagensController.cambioProfile(valorImagen,oldImagenes);

    res.render('travels/editado');
});

router.post('/:id/editado', isAdmind, uploads.array('imagen', 10), async (req, res) => {
    let imagens = req.files;
    let travelId = req.params.id;
    let result = req.body;
    let userId = req.session.userId;
    let imagenes = await imagensController.addTraveslId(imagens, travelId);


    await imagensController.addImagens(imagenes, travelId);
    await travelsController.editarTravel(result, userId, travelId);
    res.render('travels/editado')
})

router.post('/:id/destruir', isAdmind, async (req, res) => {

    let opcion = true;
    let travelId = req.params.id;
    if (opcion == true) {
        await travelsController.destruirViaje(travelId);
        res.render('travels/eliminado')
    } else {
        res.redirect(`/${travelId}/editar`)
    }

})




module.exports = router;
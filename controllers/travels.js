let models = require('../models');

// Lista de viajes

function getTravel() {
   
    return models.travel.findAll({
        include: [{
            model: models.user
        }]
    });
}
// Controlador que añade una ciudad y la devuelve

function addTravel(travel) {
    return models.travel.create(travel);
}


module.exports = {
    getTravel,
    addTravel
}



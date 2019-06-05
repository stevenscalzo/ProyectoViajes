let models = require('../models');

// Lista de viajes

function getTravel()
{
    console.log(models.travels + ' models');
    return models.travel.findAll();
}
// Controlador que añade una ciudad y la devuelve

function addTravel(travel)
{
    return models.travel.create(travel);
}


module.exports = {
    getTravel,
    addTravel
}



let models = require('../models');

// Lista de viajes

function getTravels() {

    return models.travel.findAll({
        include: [
            models.user,
            models.travelImages
        ]});
}
// Controlador que añade una ciudad y la devuelve

function addTravel(travel, userI) {
    console.log("travel: ", travel);
    console.log(userI);
    let addedTravel = models.travel.create(travel);
    models.travel.update({
        userId: userI
    }, {
            where: {
                destino: travel.destino
            }
        })
    return addedTravel
}

function travelId(destino) {
    console.log("destino");
    return models.travel.findAll({ where: { destino } })
}


module.exports = {
    getTravels,
    addTravel,
    travelId
}



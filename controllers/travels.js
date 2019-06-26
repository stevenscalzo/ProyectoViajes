let models = require('../models');


function getTravels() {

    return models.travel.findAll({
        include: [
            models.user,
            models.travelImages
        ]
    });
}

function addTravel(travel, userI) {
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
    return models.travel.findAll({ where: { destino } })
}

function travel(id) {
    return models.travel.findAll({
        where: { id },
        include: [
            models.user,
            models.travelImages
        ]
    })
}

function editarTravel(travel, userId, travelId) {
    if (travel.destino != "") {
        models.travel.update({
            destino : travel.destino
        }, {
                where: {
                    id: travelId
                }
            })
    };
    if (travel.precio != "") {
        models.travel.update({
            precio : travel.precio
        }, {
                where: {
                    id: travelId
                }
            })
    };
    if (travel.fecha_inicio != "") {
        models.travel.update({
            fecha_inicio : travel.fecha_inicio
        }, {
                where: {
                    id: travelId
                }
            })
    };
    if (travel.fecha_fin != "") {
        models.travel.update({
            fecha_fin : travel.fecha_fin
        }, {
                where: {
                    id: travelId
                }
            })
    };
    models.travel.update({
        userId
    }, {
            where: {
                id: travelId
            }
        })

    
}

function destruirViaje(travelId){
    models.travel.destroy({
            where: {
                id: travelId
            }
        })

}


module.exports = {
    getTravels,
    addTravel,
    travelId,
    travel,
    editarTravel,
    destruirViaje
}



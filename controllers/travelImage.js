let models = require('../models');

function addImagens(imagens) {
    console.log("imagenes: ", imagens);
    return models.travelImages.bulkCreate(imagens);
}

function addTraveslId(imagens, id) {
    
    let imagenes = imagens.map( (imagen) => {
        console.log(imagen);
     
        return {
            path: imagen.filename,
            travelId: id,
        }
    })

    return imagenes;
}


module.exports = {
    addImagens,
    addTraveslId
}
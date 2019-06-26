let models = require('../models');

function addImagens(imagens) {
    return models.travelImages.bulkCreate(imagens);
}

function addTraveslId(imagens, id) {
    if (imagens != "") {
        let imagenes = imagens.map((imagen) => {
            return {
                path: imagen.filename,
                travelId: id,
            }
        })

        return imagenes;
    }

}

function getImagenes(travelId){
    return models.travelImages.findAll({
        where: { travelId },
        })

}

function cambioProfile(valorImagen,oldImagenes){
    for(let i = 0; i < oldImagenes.length; i++){
        let id =oldImagenes[i].id;
        
            if(valorImagen == id){
                models.travelImages.update({
                 profile: 1
             }, {
                     where: { id }
                 })
 
            } else {
             models.travelImages.update({
                 profile: 0
             }, {
                     where: { id }
                 })
            }
     }
     

}

module.exports = {
    addImagens,
    addTraveslId,
    getImagenes,
    cambioProfile
}
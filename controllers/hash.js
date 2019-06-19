let models = require('../models');


function generaHash(code) {
   let hash = {code}
    return models.hash.create(hash);
}

function hashId (code, id) {
    console.log("code: " + code + "y el id: " + id);
    models.hash.update({
        userId : id
    }, {
        where: {
            code
        }
    })

    return 'OK'
}

async function findUserCode(code){
     let usuarioId= models.hash.findAll({ where: { code:code} })
     return usuarioId
}

async function activarCuenta(id){
    console.log("el id: " + id);
    models.user.update({
        active : 1
    }, {
        where: {
            id
        }
    })

    return 'OK'

}


module.exports = {
    generaHash,
    hashId,
    findUserCode,
    activarCuenta
}
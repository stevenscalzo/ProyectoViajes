let models = require('../models');


function generaHash(code) {
    let hash = { code }
    return models.hash.create(hash);
}

function hashId(code, id) {
    models.hash.update({
        userId: id
    }, {
            where: { code }
        })
}

async function findUserCode(code) {
    console.log(code);
    let usuarioId = await models.hash.findAll({ where: { code: code } })
    console.log(usuarioId[0].dataValues.userId);
    return usuarioId[0].dataValues.userId
}

async function activarCuenta(id) {
    models.user.update({
        active: 1
    }, {
            where: { id }
        })
}


module.exports = {
    generaHash,
    hashId,
    findUserCode,
    activarCuenta
}
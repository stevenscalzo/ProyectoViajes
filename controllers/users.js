const models = require('../models');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


// Comprueba si está logueado si lo está devuelve el usuario y si no null
async function checkLogin(email, password) {

    let user = await models.user.findAll({ where: { email: email } })
    if (user.length === 0) {
        return null
    } else {
// Comparar contraseñas
        let match = await bcrypt.compare(password, user[0].password);
        return match ? user[0] : null;
    }

}
// Registra un nuevo usuario en la bbdd
async function register(email, password, name) {

    let hash = await bcrypt.hash(password, SALT_ROUNDS);
    let user = {
        password: hash,
        email,
        name,
    }
    return models.user.create(user);
}

  

module.exports = {
    checkLogin,
    register
}

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
    if (email != "" & password != "" & name != "") {

        let buscarUsuario = await models.user.findAll({ where: { email: email } });
        if (buscarUsuario.length === 0) {
            let hash = await bcrypt.hash(password, SALT_ROUNDS);
            let user = {
                password: hash,
                email,
                name
            }
            return models.user.create(user);
        }
    }
}

// buscar correo
async function userId(email) {
    let usuarioId = models.user.findAll({ where: { email: email } })
    return usuarioId
}


async function generateCode(){
    let chars = "0123456789abcdefABCDEF";
    let lon = 20;
    code = "";
    for (x = 0; x < lon; x++) {
      rand = Math.floor(Math.random() * chars.length);
      code += chars.substr(rand, 1);
    }
    return code;
}

async function cambiarPassword(id, newPasword) {
    let hash = await bcrypt.hash(newPasword, SALT_ROUNDS);
    models.user.update({
        password: hash
    }, {
            where: { id }
        })
}

function getUsers() {

    return models.user.findAll();
}

function cambioEstatus(valoresAdmin,users){
    
    for(let i = 0; i < users.length; i++){
       let id =users[i].id;
       console.log(valoresAdmin);
       
           if(valoresAdmin[i] == 1){
               console.log("ejecutando 1");
               models.user.update({
                admin: 1
            }, {
                    where: { id }
                })

           } else {
               console.log("no admin");
            models.user.update({
                admin: 0
            }, {
                    where: { id }
                })
           }
    }
    

}


module.exports = {
    checkLogin,
    register,
    userId,
    generateCode,
    cambiarPassword,
    getUsers,
    cambioEstatus
}

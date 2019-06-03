const CONN = require('../connection/mysqlconnection');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


// Comprueba si está logueado si lo está devuelve el usuario y si no null
function checkLogin(email, password){
    return new Promise((resolve, reject) => {
        const selectQuery = 'SELECT * FROM users WHERE email = ?';
        CONN.query(selectQuery, [email], (err, users) => {
            if(users.length === 0){
                resolve(null)
            }else{
                // Comparar contraseñas
                console.log(password, users[0].password)
                bcrypt.compare(password, users[0].password, (err, match) => {
                    console.log(match);
                    resolve( match ? users[0] : null);
                })
            }
        })
    })
}

// Registra un nuevo usuario en la bbdd
function register(email, password, name){
    return new Promise( async (resolve, reject) => {
        let hash = await bcrypt.hash(password, SALT_ROUNDS );
        console.log(hash);
        const insertQuery = 'INSERT INTO users SET ?';
        let user = {
            password: hash,
            email, 
            name,
        }
        console.log(user);
        CONN.query(insertQuery, [user], (err, result) => {
            
            if(err){
                resolve(false)
            }else{
                resolve(true);
            }
        })
    })
}


module.exports = {
    checkLogin,
    register
}

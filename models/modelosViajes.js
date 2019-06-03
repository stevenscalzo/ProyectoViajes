const CONN = require('../connection/mysqlconnection');

// Controlador que devuelve una promesa
function getTravel(){
    // Creamos una promesa y la devolvemos
    return new Promise((resolve, reject) => {
        // Hacemos la llamada a la bbdd
        CONN.query('SELECT * FROM viaje', (error, rows) => {
            // Cuando la bbdd nos devuelva los datos resolvemos la promesa
            resolve(rows);
        })
    })
}


// Controlador que añade una ciudad y la devuelve
function addTravel(travel){
    return new Promise((resolve, reject) => {
        CONN.query("INSERT INTO Viaje SET ?", [travel], (err, result) => {
            console.log(result)
            CONN.query("SELECT * FROM Viaje WHERE id = ?", [result.insertId], (selErr, travels) => {
                console.log(travels)
                resolve(travels[0]);
            });
        });
    })
}

module.exports = {
    getTravel,
    addTravel
}



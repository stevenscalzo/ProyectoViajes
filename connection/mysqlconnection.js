const MYSQL = require('mysql2');

const CONN = MYSQL.createConnection({
    host: 'localhost',
    user: 'viajesAdmin',
    password: 'viajes1234',
    database: 'viajes',
});

module.exports = CONN;
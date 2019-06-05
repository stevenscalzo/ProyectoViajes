
module.exports = {
    development: {
        username: 'viajesAdmin',
        password: 'viajes1234',
        database: 'viajes',
        host: "localhost",
        dialect: 'mysql',
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
    },
    production: {
        username: 'viajesAdmin',
        password: 'viajes1234',
        database: 'viajes',
        dialect: 'mysql',
    }
};
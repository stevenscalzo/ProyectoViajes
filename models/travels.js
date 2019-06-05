'use strict'

module.exports = (sequelize, DataTypes) => {
    var travel = sequelize.define('travel', {
        destino: DataTypes.STRING,
        precio: DataTypes.FLOAT,
        descuento: DataTypes.INTEGER,
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        imagen: DataTypes.STRING
    })

    return travel;
}
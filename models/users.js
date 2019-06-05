'use strict'

module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
    })

    return user
}
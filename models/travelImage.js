'use strict'

module.exports = (sequelize, DataTypes) => {
    var travelImages = sequelize.define('travelImages', {
        path: DataTypes.STRING,   
        profile: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }     
    })
    travelImages.associate = function(models){
        models.travelImages.belongsTo(models.travel)
        
      }

    return travelImages;
}
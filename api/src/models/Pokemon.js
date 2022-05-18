const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        min: 898,
        max: 10001,
      },
    },name: {
      type: DataTypes.STRING,
      allowNull: false,
    },life:{
      type:  DataTypes.INTEGER,
    },defense:{
      type:  DataTypes.INTEGER,
    },strong:{
      type:  DataTypes.INTEGER,
    },speed:{
      type:  DataTypes.INTEGER,
    },height:{
      type:  DataTypes.INTEGER,
    },weight:{
      type:  DataTypes.INTEGER,
    },img: {
      type: DataTypes.STRING,
    },
  },{
    timestamps: false,}//no quiero ni createtedAt ni updateAt
  );
};

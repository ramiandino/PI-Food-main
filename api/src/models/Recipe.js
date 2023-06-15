const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
      allowNull: false,
    },
    /* hace Referencia al paso a paso de la comida */
    stepbyStep: {
      /* type: DataTypes.STRING, */
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb: {
      //creado en base de datos sirve para hacer un llamado solo en la base de datos(cuando se hace una distincion entre los datos que me trae la api y la db  es mas facil acceder a la receta que yo cree en db por esta propiedad)
      type: DataTypes.BOOLEAN, //ya mi receta en la base de datos va a tener esta propiedad y gracias a eso  se puede distinguir entre los que yo cree y los de la api
      allowNull: false,
      defaultValue: true, //todos los que yo cree en db se van a crear con este campo en true
    },
  });
};

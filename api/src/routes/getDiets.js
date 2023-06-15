const getDiets = require("express").Router();
const { Diet } = require("../db");
const { getAllRecipes } = require("../controllers/controllers");

getDiets.get("/", async (req, res) => {
  const cantidadDiets = await Diet.count(); //La función count() se usa para contar el número de colecciones en el elemento
  try {
    if (!cantidadDiets) {
      console.log("I had to create them");
      const allMyRecipes = await getAllRecipes();
      const recipesDiets = allMyRecipes.map((recipes) => recipes.diets);
      const myDiets = recipesDiets.flat(); // Nuevo arreglo con los elem. de los sub arreglos concatenados -> [[1, 2], [3, 2]] -> [1, 2, 3, 2]
      //El flat() método crea una nueva matriz con todos los elementos de la submatriz concatenados recursivamente hasta la profundidad especificada.
      const mySetDiets = [...new Set(myDiets)]; // Me elimina los repetidos(set solo acepta valores unicos) -> [1, 2, 3, 2] -> [1, 2, 3]
      // res.status(200).send(mySetTypes);
      mySetDiets.forEach((diet) => {
        console.log(mySetDiets);
        Diet.findOrCreate({ where: { name: diet } }); // Busca en la tabla type, en la columna name si tiene el type, sino lo crea.
      });
      const theDiets = await Diet.findAll();
      res.status(200).send(theDiets);
    } else {
      console.log("I already had them so I didn't create them");
      // const allTypes = await Type.findAll(); // Trae todos los datos de la tabla type.
      const theDiets = await Diet.findAll();
      res.status(200).send(theDiets);
    }
  } catch (error) {
    res.status(404).send(error + "There are no recipes");
  }
});

module.exports = getDiets;

//ENTRAMOS A LA API,ME TRAIGO LA INFO DE LA API,LA MAPEO, HAGO UN findOrCreate DENTRO DEL MODELO Y ME GUARDA TODAS ESOS Types EN EL MODELO.
//ESTO SE HACE SOLO UNA VEZ AL TENER EL FORCE EN FALSE.ME TRAIGO LA INFO DE LA API PARA GUARDARLA EN LA DB Y SACARLA DESDE AHI.

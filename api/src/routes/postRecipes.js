const postRecipes = require("express").Router();
const { Recipe, Diet } = require("../db");

postRecipes.post("/", async (req, res) => {
  const { name, summary, healthScore, stepbyStep, image, createdInDb, diets } =
    req.body;
  if (!name || !summary) {
    res.status(404).send("Name and summary data are required");
  } else {
    try {
      const recipeCreated = await Recipe.create({
        //hago otra constante y lo creo usando el modelo y create
        name,
        summary,
        healthScore,
        stepbyStep,
        image,
        createdInDb,
        //ACA NO LE PASAMOS genres por que tenemos que hacer la relacion aparte.
      });
      const dietDb = await Diet.findAll({
        where: {
          name: diets,
        },
      });
      //DENTRO DEL MODELO Genres ENCONTRA TODOS LOS Genres QUE COINCIDAN CON genres que le estoy pasando por body.
      recipeCreated.addDiet(dietDb); // agrego la dieta al modelo Recipe
      res.status(200).send("Recipe Successfully created");
    } catch (error) {
      res.status(404).send(error + "Error creating Recipe");
    }
  }
});

module.exports = postRecipes;

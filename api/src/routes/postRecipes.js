const postRecipes = require("express").Router();
const { Recipe, Diet } = require("../db");

postRecipes.post("/", async (req, res) => {
  try {
    const { name, summary, healthScore, stepbyStep, img, createdInDb, diets } =
      req.body;
    const createRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      stepbyStep,
      img,
      createdInDb,
    });

    const dietDb = await Diet.findAll({
      where: { name: diets },
    });
    console.log(dietDb);
    createRecipe.addDiet(dietDb);
    res.status(200).send("Recipe Successfully created");
  } catch (error) {
    console.log("Error creating Recipe", error);
  }
});

module.exports = postRecipes;

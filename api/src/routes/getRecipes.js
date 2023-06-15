const getRecipes = require("express").Router();
const { getAllRecipes } = require("../controllers/controllers");

getRecipes.get("/", async (req, res) => {
  const name = req.query.name;
  try {
    let recipesTotal = await getAllRecipes();
    if (name) {
      let recipeName = await recipesTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeName.length
        ? res.status(200).send(recipeName)
        : res.status(404).send("There is no recipe");
    } else {
      res.status(200).send(recipesTotal);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

getRecipes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recipesTotal = await getAllRecipes();
    if (id) {
      let recipeId = await recipesTotal.filter((el) => el.id == id);
      if (recipeId.length) {
        res.status(200).json(recipeId);
      }
    }
  } catch (error) {
    res.status(404).send(error + "There is no recipe");
  }
});

module.exports = getRecipes;

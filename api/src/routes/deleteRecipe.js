const deleteRecipes = require("express").Router();
const { Recipe } = require("../db");

deleteRecipes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipeDelete = await Recipe.findByPk(id);
    if (!recipeDelete) {
      res.status(400).send("The recipe you want to eliminate does not exist");
    } else {
      recipeDelete.destroy();
      return res.status(200).send("Recipe successfully removed");
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message }, "I entered the delete error");
  }
});

module.exports = deleteRecipes;

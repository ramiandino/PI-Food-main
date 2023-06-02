const getRecipes = require("express").Router();
const { getAllRecipes } = require("../controllers/controllers");

getRecipes.get("/", async (req, res) => {
  const name = req.query.name; //en el front busco por nombre para el detalle.(buscar si un hay un query para esta propiedad).
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

//DELETE

getRecipes.delete("/delete/:id", async (req, res) => {
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

module.exports = getRecipes;

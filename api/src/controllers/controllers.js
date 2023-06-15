const { Recipe, Diet } = require("../db");
const { key } = process.env;
const axios = require("axios");

//FUNCIONES CONTROLADORAS QUE ME TRAIGAN INFORMACION Y DESPUES EN LAS RUTAS INVOCARLAS.
//INFORMACION QUE VIENE DE LA API.

//usamos async await por que no sabemos cuanto va a demorar la respuesta entonces le avisamos que tiene que
//esperar a la respuesta antes de cargar la informacion a la variable apiUrl

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=90&addRecipeInformation=true` //api original
    // "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5" //ilimitada.
  );

  const apiInfo = await apiUrl.data.results.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      //paso a paso
      stepbyStep: recipe.analyzedInstructions[0]
        ? recipe.analyzedInstructions[0].steps.map(
            (recipe, i) => `${i + 1}: ${recipe.step}`
          )
        : ["No existen instrucciones para esta receta."],
      img: recipe.image,
      diets: recipe.diets
        ? recipe.diets.map((diet) => diet)
        : "This recipe has no associated diets",
    };
  });
  return apiInfo;
};

//DEVOLVER LOS DATOS QUE YO NECESITO TRAERME DESDE EL BACK.
//INFORMACION DE VIENE DE LA BASE DE DATOS.

const getDbInfo = async () => {
  const recipesDB = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"], //le pasamos solo el name treme solo lo que tiene el atributo y no todo lo que tiene el modelo
      through: {
        attributes: [],
      },
    },
  });

  const recipesMapeados = recipesDB?.map((recipe) => {
    //devolvemos objetos mas simplesque contineen solo datos relevantes
    const { diets } = recipe;
    const recipeData = {
      ...recipe.dataValues,
      diets: diets.map((r) => r.name),
    };
    return recipeData;
  });
  return recipesMapeados;
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
};

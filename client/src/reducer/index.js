const initialState = {
  recipes: [],
  allRecipes: [], //copia del estado que siempre tenga todos los videogames.
  diets: [],
  detail: [],
  error: false,
  currentPage: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload, //en mi estado videogames que en un principio es un array vacio manda todo lo que te mande la accion GET_VIDEOGAMES.
        allRecipes: action.payload, //meteme todos los videogames en allVideogames.
      };
    case "GET_NAME_RECIPES":
      return {
        ...state,
        recipes: action.payload, //videogames porque es lo que estoy renderizando.
        currentPage: 1,
      };
    case "POST_RECIPE":
      return {
        ...state, //devolveme el estado como esta,porque yo lo voy a crear en una ruta nueva.
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_DETAIL_FROM_STATE":
      const todasLasRecetas = [...state.allRecipes];
      const detallesRecipes = todasLasRecetas.filter(
        (recipe) => recipe.id.toString() === action.payload
      );
      return {
        ...state,
        detail: detallesRecipes,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTER_BY_DIETS":
      //la logica va antes del return,si va adentro se rompe.
      const allRecipes = state.allRecipes; //cuando se filtre primero todos las recipes siempre van a ser el array que tiene todo => allRecipes.
      const dietFiltered =
        action.payload === "All"
          ? allRecipes //si mi payload es todo,me devuelve todo.
          : allRecipes.filter((e) => e.diets.includes(action.payload)); //sino entra en allRecipes,filtra por el payload que llega.
      return {
        ...state,
        recipes: dietFiltered, //en mi estado filteredVideogames suceda todo lo de arriba,ya que no se puede hacer logica adentro del return.
        currentPage: 1,
        error: false,
      };
    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "Created"
          ? state.allRecipes.filter((el) => el.createdInDb)
          : state.allRecipes.filter((el) => !el.createdInDb);
      return {
        ...state,
        recipes: action.payload === "All" ? state.allRecipes : createdFilter,
      };
    case "ORDER_BY_NAME":
      const allDietas = [...state.recipes];
      const sortedRecipe =
        action.payload === "A-Z"
          ? allDietas.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : allDietas.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipe,
      };
    case "ORDER_BY_HEALTHSCORE":
      const allDieta = [...state.recipes];
      const sortedRecipeHealthScore =
        action.payload === "healthMin"
          ? allDieta.sort(function (a, b) {
              return a.healthScore - b.healthScore;
            })
          : allDieta.sort(function (a, b) {
              return b.healthScore - a.healthScore;
            });
      return {
        ...state,
        recipes: sortedRecipeHealthScore,
      };
    case "RESET_RECIPES":
      const allRecipess = [...state.allRecipes];
      return {
        ...state,
        recipes: allRecipess,
        currentPage: 1,
        error: false,
      };
    case "CLEAN_DETAIL": //el caso de que sea clean detail le voy a retornar una copia de todo lo que habia en el estado y gameDetail le pisa el valor con un objeto vacio
      return {
        //(4) //el reducer empieza a evaluar, te doy una copia del estado para no perder el anterior
        ...state,
        detail: {}, //y gameDetail ahora va  a estar vacio
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;

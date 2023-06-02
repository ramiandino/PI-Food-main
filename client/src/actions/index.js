import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/recipes", {}); //Conexion entre el back y el front. 3 lineas de codigo!!! por default hace axios.get
      return dispatch({
        type: "GET_RECIPES",
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: "SET_ERROR",
        payload: true,
      });
    }
  };
}

export function getNameRecipes(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/recipes?name=${name}`); //me va a llegar por payload lo que el usuario este escribiendo en la barra de busqueda.
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: json.data, //me va a devolver lo que devuelta la ruta una vez asignado el name.
      });
    } catch (error) {
      return dispatch({
        type: "SET_ERROR",
        payload: true,
      });
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/diets", {});
    return dispatch({ type: "GET_DIETS", payload: info.data });
  };
}

export function postRecipe(payload) {
  //me va a llegar en el front este payload.
  return async function (dispatch) {
    const info = await axios.post("http://localhost:3001/post", payload); //hacer el post del payload.
    console.log(info);
    return info;
  };
}

//TENER EN CUENTA QUE LA LOGICA HAY QUE TRATAR DE HACERLO EN EL REDUCER Y EN LOS COMPONENTES. LA ACTION ES PARA DESPACHAR UN TIPO.

export function filterByRecipesDiet(payload) {
  //payload = value que me va a llegar del select en Home.
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}

export function setError(payload) {
  return {
    type: "SET_ERROR",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByHealthScore(payload) {
  return {
    type: "ORDER_BY_HEALTHSCORE",
    payload,
  };
}

export function resetRecipes() {
  return {
    type: "RESET_RECIPES",
  };
}

export const getDetail = (id) => {
  return function (dispatch) {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "GET_DETAIL", payload: data }));
  };
};

// export function deleteRecipe(recipeId) {
//   return async function (dispatch) {
//     try {
//       await axios.delete(`/delete/${recipeId}`);
//       return dispatch({
//         type: "DELETE_DETAIL",
//       });
//     } catch (error) {
//       console.log("No puedo eliminar la recipe", error);
//     }
//   };
// }

export function deleteRecipe(recipeId) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/delete/${recipeId}`)
      .then(() => {
        resolve({ type: "GET_DETAIL" });
      })
      .catch((error) => {
        console.log("I cannot delete the recipe", error);
        reject(error);
      });
  });
}

export function getDetailFromState(payload) {
  return {
    type: "GET_DETAIL_FROM_STATE",
    payload,
  };
}

export const cleanDetail = () => {
  //cleanDetail no es mas que una funcion que retorna un objeto (3)
  return { type: "CLEAN_DETAIL" };
};

export function setCurrentPage(payload) {
  return {
    type: "SET_CURRENT_PAGE",
    payload,
  };
}

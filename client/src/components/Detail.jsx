// import { getDetail, cleanDetail } from "../actions/index";        //me traigo al action
// import { useDispatch, useSelector } from "react-redux";// use dispatch para hacer el dispatch de esa action  con use selector me traigo la info del estado global
// import { useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// // import styles from "../styles/Detail.module.css";

// const RecipeDetail = () => {
//     const dispatch = useDispatch();
//     const { id } = useParams(); //use params me retorna un objeto por eso podemos hacer distractori

//     const myRecipe = useSelector((state) => state.detail)
//     //dodmount unmount update siclos de vida en el useEffect
//     useEffect(() => { //cuando se retorna una funcion el useEffect  lo que hace es ejecutar el return cuando se desmonta el componente 
//         dispatch(getDetail(id)); //(didmount)//el id lo sacamos de use params  cuando estemos en el componente de detalles queremos que
//         //queremos que se cargue la info de la receta para poder visualizarla 
//         return () => dispatch(cleanDetail()) //(unmount)//cuando yo no este en estoy en este componente y no estoy viendo el detalle de ninguna receta quiero que
//         //se me limpie el estado por que sino se me muestra unos milisegundos la info de la receta anterior y eso no debe pasar entonces
//         //creamos una action que se llame cleandetail que se va a ejecutar cuando se desmonta el componente y cuando pase eso se va a 
//         //despachar la action cleandetail que lo que hace es limpiarme el estado (1)
//     }, []);//(update)
//     return (
//         <div>       
//             <Link to="/home">
//                 <button>Return to home</button>
//             </Link>                         
//             <img src={myRecipe[0]?.img} alt="img-recipe"></img>                                                     
//             <h1>{myRecipe[0]?.name}</h1>      
//             <p>{myRecipe[0]?.id}</p>
//             <p>{myRecipe[0]?.diets}</p>
//             <p>{myRecipe[0]?.summary}</p>
//             <p>{myRecipe[0]?.healthScore}</p>
//             <p>{myRecipe[0]?.stepBystep}</p>                                    
//         </div>                      
//     )
// }
// export default RecipeDetail;

import { getDetail, getDetailFromState, deleteRecipe, getRecipes } from "../actions/index.js";    //me traigo las actions    
import { useDispatch,useSelector } from "react-redux";// use dispatch para hacer el dispatch de esa action  con use selector me traigo la info del estado global
import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import loading from "../styles/gifs/sarten.gif";
import styles from "../styles/Detail.module.css";


const RecipeDetail = () => {
    const dispatch = useDispatch();// Es una función que permite lanzar acciones (actions) al store, con la intención de afectar el estado
    const { id } = useParams(); //use params me retorna un objeto por eso podemos hacer distractoring
    const history = useHistory();
    const recipeDetail = useSelector((state) => state.detail); //es un Hook que nos permite extraer datos del store de Redux utilizando una función selectora
    const allRecipes = useSelector((state) => state.recipes);
    
    useEffect(() => {
    if (allRecipes.length) {
      dispatch(getDetailFromState(id));
    } else {
      dispatch(getDetail(id));
    }
  }, [dispatch, id, allRecipes.length]);

    const handlerDelete = () => {
        dispatch(deleteRecipe(id));
        alert("Recipe deleted");
        history.push("/home");
        dispatch(getRecipes());
    };

    return (
        <div className={styles.allDetail}>
            <div className={styles.navBar}>
                <Link to="/home">
                    <button className={styles.buttonHome}>Return to home</button>
                </Link>
            </div>
            {recipeDetail.length ? (  
            <div className={styles.contGral}>
                <div className={styles.contBlue}>
                    <div className={styles.contGris}>
                        <div className={styles.contIzq}>
                            <div className={styles.circulo}>
                                <img src={recipeDetail[0]?.img}
                                alt="imagen-de-la-recipe"
                                className={styles.image}></img>
                            </div>   
                            <div className={styles.infoBasica}>
                                <div className={styles.name}>
                                    <h1>{recipeDetail[0]?.name}</h1>
                                </div>     
                                <ul className={styles.diets}>
                                {recipeDetail[0].diets.map((diet) => (
                                <div key={recipeDetail[0].name + diet} className={diet}>
                                    {/* {diet.toUpperCase()} */}
                                </div>
                            ))}
                            </ul>
                                <div className={styles.id}>ID #{recipeDetail[0]?.id}</div>
                            </div> 
                        </div> 
                            <div className={styles.contDer}>
                            <div className={styles.filaStat}>
                                    <div className={styles.number}>Healthscore:</div>
                                    <div className={styles.number}>
                                        {recipeDetail[0].healthScore}
                                    </div>
                                    <div className={styles.barra}>
                                        <div
                                            className={styles.healthScore}
                                            style={{
                                                width: `${(recipeDetail[0].healthScore / 100) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                            </div>                        
                            <div className={styles.filaStat}> 
                                    <div className={styles.number}>Summary:</div>
                                    <div className={styles.summary}>
                                        <p dangerouslySetInnerHTML={{ __html: recipeDetail[0].summary }}></p>
                                    </div>
                            </div>                                                
                            <div className={styles.filaStat}>
                                    <div className={styles.number}>Steps:</div>
                                    <div className={styles.stepbyStep}>
                                        {recipeDetail[0].stepbyStep}
                                    </div>
                            </div>
                            {recipeDetail[0].createdInDb && ( 
                                    <div className={styles.buttons}>
                                    <Link to={`/home`}>
                                    <button
                                    onClick={(event) => handlerDelete(event)}
                                        className={styles.deleteButton}
                                        >
                                        Delete Recipe
                                    </button>
                                    </Link>
                                </div>
                                )}
                            </div>    
                    </div>       
                </div>   
            </div>
        ) : (
            <div className={styles.loading}>
            <img src={loading} alt="loading" className={styles.loading1}/>
            </div>
        )}   
        </div>  
    )
}

export default RecipeDetail;





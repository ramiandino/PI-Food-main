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





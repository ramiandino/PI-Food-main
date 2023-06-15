import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterByRecipesDiet, filterCreated, orderByName, orderByHealthScore, resetRecipes, setError, cleanDetail } from '../actions';
import { Link } from 'react-router-dom';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Error from "./Error";
import styles from "../styles/Home.module.css";
import logo from "../styles/images/logo.png";
import recargar from "../styles/images/refresh.png";
import github from "../styles/images/logoGithub.png";
import linkedin from "../styles/images/logoLinkedin.png";


export default function Home() {
    const dispatch = useDispatch(); //esto es para dispatchar mis acciones.
    //traeme en allRecipes todo lo que esta en el estado de recipes.
    const recipeDetail = useSelector((state) => state.detail);
    const allDiets = useSelector((state) => state.diets);
    const error = useSelector((state) => state.error);
    const recipesCopia = useSelector((state) => state.allRecipes);

    useEffect(() => {
    if (!recipesCopia.length) {
      dispatch(getRecipes());
      dispatch(getDiets());
    }
    recipeDetail.length && dispatch(cleanDetail());
  }, [dispatch, recipesCopia.length, recipeDetail.length]);

    function handleClick(event) {       //tema botones,clicks o cosas que ejecuten cosas,siempre arriba.
        event.preventDefault();   // preventDefault para que no se me rompan las cosas y no se recargue la pagina.CADA VEZ QUE RECARGAMOS LOS ESTADOS DE REDUX VUELVEN A CARGARSE SI TENEMOS UN useEffect.
        dispatch(setError(false));
        dispatch(getRecipes());
    }
    function handleSort(event) {
        if (event.target.value === "A-Z" || event.target.value === "Z-A") {
            event.preventDefault();
            dispatch(orderByName(event.target.value));
        }
        if (event.target.value === "healthMin" || event.target.value === "healthMax") {
            event.preventDefault();
            dispatch(orderByHealthScore(event.target.value));
        }
        if (event.target.value === "default") {
            event.preventDefault();
            dispatch(resetRecipes());
    }
    }
    function handleFilterDiet(event) {
        if (event.target.value === "All") {
            event.preventDefault();
            dispatch(resetRecipes());
        } else {
        dispatch(filterByRecipesDiet(event.target.value));
        }
        // dispatch(setCurrentPage(1)); esta es otra forma de solucionar lo del setcurrentpage
    }
    
    function handleFilterCreated(event) {
        if (event.target.value === "Existing" || event.target.value === "Created") {
        event.preventDefault();
        dispatch(filterCreated(event.target.value));
        }
        if (event.target.value === "All") {
        event.preventDefault();
        dispatch(resetRecipes());
        }
    }
    return (
        <div className={styles.containerHome}>
            <div>
                <div className={styles.navBar}>
                    <div className={styles.navIzq}>
                        <Link to="/">
                            <img src={logo} alt="logo" className={styles.logo}></img>
                        </Link> 
                    </div>
                    <SearchBar></SearchBar>
                    <div className={styles.linkedin}>
                        <a href="https://www.linkedin.com/in/ramiandino/" target="_black">
                            <img src={linkedin} alt="linkedin"/>
                        </a>
                    </div>
                    <div className={styles.github}>
                        <a href="https://github.com/ramiandino/" target="_black">
                            <img src={github} alt="github"/>
                        </a>
                    </div>    
                    <div className={styles.navDer}>
                        <Link to='/recipe' className={styles.buttonCreate}>
                            Create Recipe
                        </Link>                    
                        <button onClick={event => { handleClick(event) }} className={styles.buttonRec}>
                            <img
                                src={recargar}
                                alt="recargar"
                                className={styles.recargar}
                            ></img>
                            </button>
                    </div>  
                </div>
                <div className={styles.filters}>
                    <select onChange={(event) => handleSort(event)} className={styles.order}>
                        <option value="default">Order</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="healthMin">HealthScore Min</option>
                        <option value="healthMax">HealthScore Max</option>
                    </select>
                    <select className={styles.created} onChange={(event) => handleFilterCreated(event)}>
                        <option value="All">All</option>
                        <option value="Existing">Existing</option>
                        <option value="Created">Created</option>
                    </select>
                    <select onChange={(event) => handleFilterDiet(event)} className={styles.diets}>
                        <option value="All">All</option>  {/* el value tiene que coincidir con el value del back(de la api) */}
                            {
                                allDiets.map((g) => {
                                    return (
                                        <option value={g.name} key={g.name}>
                                            {g.name[0].toUpperCase() + g.name.slice(1)}
                                        </option>
                                    );
                                }
                            )}
                    </select>
                </div>          
            </div>
            {error ? <Error></Error> : <Paginado></Paginado>}
        </div>                                            
    )
}
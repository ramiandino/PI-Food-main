import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import styles from "../styles/Paginado.module.css";
import { setCurrentPage } from "../actions";
import izq from "../styles/images/chevron-left.png";
import der from "../styles/images/chevron-right.png";
import notFound from "../styles/images/recipeNotFound.png";

const renderData = (data) => {
  return data.map((el) => {
    return (
      <Card
        id={el?.id}
        key={el?.id}
        name={el?.name}
        img={el?.img}
        diets={el?.diets} 
      />
    );
  });
};

  function Paginado() {

    const dispatch = useDispatch();

    const allRecipes = useSelector((state) => state.recipes);

    const currentPage = useSelector((state) => state.currentPage);

    const [recipesPerPage] = useState(9);

    // useEffect(() => {
    //   dispatch(clearHome());
    // }, [dispatch]);

    const handleClick = (event) => {
      dispatch(setCurrentPage(Number(event.target.id)));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(allRecipes.length / recipesPerPage); i++) {
      // divido mi cantidad de recipes por la cantidad de recipes que quiero por pagina
      pages.push(i);
    }

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(
      indexOfFirstRecipe,
      indexOfLastRecipe
    );

    const pageNumbers = pages.map((numbers) => {
      return (
        <li
          key={numbers}
          id={numbers}
          onClick={handleClick}
          className={currentPage === numbers ? styles.active : null}
        >
          {numbers}
        </li>
      );
    });

    const handleNext = () => {
      if (currentPage + 1 <= pages.length) {
        dispatch(setCurrentPage(currentPage + 1));
      } else {
        return null;
      }
    };

    const handlePrev = () => {
      if (currentPage - 1 >= 1) {
        dispatch(setCurrentPage(currentPage - 1));
      } else {
        return null;
      }
    };

    return (
      <>
        <div className={styles.contCards}>
          {allRecipes.length ? (
            renderData(currentRecipes)
          ) : (
            <div>
              <img src={notFound} alt="notFound" className={styles.notFound} />
            </div>
          )}
        </div>

        <div>
          <ul className={styles.pageNumbers}>
            <li>
              <button onClick={handlePrev}>
                <img src={izq} alt="izq" className={styles.chevIzq}></img>
              </button>
            </li>

            {pageNumbers}

            <li>
              <button onClick={handleNext}>
                <img src={der} alt="der" className={styles.chevDer}></img>
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  }

export default Paginado;
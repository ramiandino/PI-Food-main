import React from "react";
import { useDispatch } from "react-redux";
import { getRecipes, getDiets, setError } from "../actions";
import recipeNotFound from "../styles/images/recipeNotFound.png";
import styles from "../styles/Error.module.css";

function Error() {
  const dispatch = useDispatch();

  const handleHome = (event) => {
    event.preventDefault();
    dispatch(setError(false));
    dispatch(getRecipes());
    dispatch(getDiets());
  };
  return (
    <div className={styles.contError}>
      <img src={recipeNotFound} alt="recipeNotFound" className={styles.recipeNotFound} />
      <div className={styles.texto}>
        <div className={styles.text}>Oh no!</div>
        <div className={styles.parrafo}>Can't find what you're looking for</div>
      </div>
      <button onClick={(event) => handleHome(event)} className={styles.button}>
        Return to home
      </button>
    </div>
  );
}

export default Error;
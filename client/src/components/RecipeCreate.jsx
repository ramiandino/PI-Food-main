import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets, getRecipes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/RecipeCreate.module.css";
import food from "../styles/images/food.png";
import chef from "../styles/images/chef.png";
import recipeForm from "../styles/images/recipeForm.png";

function validate(input) {
        const errors = {};

        if (!input.name) {
            errors.name = "Name is required";
        } else if (input.name.length > 50) {
            errors.name = "Name is too long";
        }

        if (!input.summary) {
            errors.summary = "Summary is required ";
        } else if (input.summary.length > 1500) {
            errors.summary = "Summary is too long. (Max = 1500 characters)";
        }

        if (!input.healthScore) {
            errors.healthScore = "The healthscore is required";
        } else if (input.healthScore < 0 || input.healthScore > 100) {
            errors.healthScore = "Healthscore must range between 0 to 100";
        }

        if (!input.stepbyStep) {
            errors.stepbyStep = "Stepbystep is required";
        } else if (input.stepbyStep.length > 1500 ) {
            errors.summary = "Stepbystep is too long. (Max = 1500 characters)";
        }
        
        if (!input.img) {
            errors.img = "Image URL is required";
        }

        if (!input.diets[0]) {
            errors.diets = "Minimun one Diet is required ";
        }

        return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    img: "",
    summary: "",
    healthScore: "",
    stepbyStep: "",
    diets: [],
  });

  let btnDisabled =
    !(
      input.name.length &&
      input.img.length &&
      input.summary.length &&
      input.healthScore.length &&
      input.stepbyStep.length &&
      input.diets.length
    ) ||
    input.summary > 1500 ||
    input.healthScore > 100 ||
    input.stepbyStep > 1500;

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    setErrors(
      validate({
        ...input,
      })
    );
  }, [input]);

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value.toLowerCase(),
    });

    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSelect = (event) => {
    if (!input.diets.includes(event.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, event.target.value],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postRecipe(input));
    alert("Recipe create");
    setInput({
        name: "",
        img: "",
        summary: "",
        healthScore: "",
        stepbyStep: "",
        diets: [],
    });
    history.push("/home");
    dispatch(getRecipes());
  };

  const handleDeleteDiet = (event) => {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== event),
    });
  };

  return (
    <div className={styles.create}>
      <div className={styles.navBar}>
        <Link to="/home">
          <button className={styles.button}>Return to home</button>
        </Link>
        <img src={recipeForm} alt="recipe" className={styles.recipeForm}/>
      </div>
      <div className={styles.contGral}>
        <div className={styles.cardCreate}>
          <img src={chef} alt="chef" className={styles.chef}/>
          <div className={styles.title}>
            <img src={food} alt="food" className={styles.food}></img>
            <div className={styles.title}>Create your Recipe</div>
          </div>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className={styles.form}>
              <div className={styles.izq}>
                <div>
                  <div>Name:</div>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(event) => handleInput(event)}
                    placeholder="Name"
                    className={styles.inputs}
                  />
                  {errors.name && (
                    <div className={styles.error}>{errors.name}</div>
                  )}
                </div>
                <div>
                  <div>Image:</div>
                  <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(event) => handleInput(event)}
                    className={styles.inputs}
                    placeholder="URL"
                  />
                  {errors.img && <div className={styles.error}>{errors.img}</div>}
                </div>
                <div>
                  <div>Healthscore:</div>
                  <input
                    type="number"
                    value={input.healthScore}
                    name="healthScore"
                    onChange={(event) => handleInput(event)}
                    placeholder="1 - 100"
                    className={styles.inputs}
                  />
                  {errors.healthScore && (
                    <div className={styles.error}>{errors.healthScore}</div>
                  )}
                </div>
              </div>
              <div className={styles.der}>
                <div>
                  <div>Steps:</div>
                  <input
                    type="text"
                    value={input.stepbyStep}
                    name="stepbyStep"
                    onChange={(event) => handleInput(event)}
                    placeholder="..."
                    className={styles.input}
                  />
                  {errors.stepbyStep && (
                    <div className={styles.error}>{errors.stepbyStep}</div>
                  )}
                </div>
                <div>
                  <div>Summary:</div>
                  <input
                    type="text"
                    value={input.summary}
                    name="summary"
                    onChange={(event) => handleInput(event)}
                    placeholder="..."
                    className={styles.input}
                  />
                  {errors.summary && (
                    <div className={styles.error}>{errors.summary}</div>
                  )}
                </div>
                <div>
                  <select
                    onChange={(event) => handleSelect(event)}
                    className={styles.select}
                    disabled={input.diets.length >= 2}
                    defaultValue="title"
                  >
                    <option value="title" disabled name="diets">
                      Diets
                    </option>
                    {diets.map((diet) => {
                      return (
                        <option
                          value={diet.name}
                          key={diet.name}
                          className={styles.options}
                        >
                          {diet.name[0].toUpperCase() + diet.name.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                  <ul className={styles.diets}>
                    {input.diets.map((diet) => {
                      return (
                        <li key={diet} className={styles.diets}>
                          {diet[0].toUpperCase() + diet.slice(1)}
                          <button
                            onClick={() => handleDeleteDiet(diet)}
                            className={styles.deleteButton}
                          >
                            x
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {errors.diets && (
                    <div className={styles.error}>{errors.diets}</div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={btnDisabled}
                  className={styles.button}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


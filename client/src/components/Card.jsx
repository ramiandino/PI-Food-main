import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Card.module.css";

// Como vamos a pasar las propiedades por props no hace falta traer ningun estado por que tenemos la logica en el Home.
export default function Card ({img,name,diets,id,}) {  //aca me traigo las propiedades
    return (
        <div className={styles.contCard}>
            <img src={img} alt="imagen card" className={styles.img} />
             <div className={styles.name}>{name[0].toUpperCase() + name.slice(1)}</div>
                <div className={styles.diets}>
                    <p>{diets.join(", ")}</p>
                </div>
            <Link to={`/detail/${id}`}>
                <button className={styles.cardButton}><span>Read More</span></button>
            </Link>
        </div>
    )  
}
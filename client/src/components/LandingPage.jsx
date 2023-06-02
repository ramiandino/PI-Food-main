import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/LandingPage.module.css";
import video from "../styles/videos/Video.mp4"
import plato from "../styles/images/Plato.png"

export default function LandingPage() {
    return (
            <div>
                <div>
                    <video className={styles.video} autoPlay loop muted>
                        <source src={video} type='video/mp4'></source>
                    </video>
                    {/* <img className={style.video} src={img} alt='Img NOT FOUND'></img> */}
                    <div className={styles.overlay}></div>
                    <div className={styles.absolute}>
                        <h1 className={styles.text}> PI Food </h1>
                    </div>
                    <div>
                        <Link to='/home'>
                            <img className={styles.img} src={plato} alt="Platito"></img>
                        </Link>
                    </div>
                </div>
            </div>
        )
}
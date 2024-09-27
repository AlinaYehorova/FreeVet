import React from 'react';
import '../../App.css';
import styles from './mainHeader.module.css';
import leftPaw from "../../assets/main_header_img/path_to_left_paw.png";
import catAndDog from "../../assets/main_header_img/path_to_cat_and_dog.png";
import rightPaw from "../../assets/main_header_img/path_to_right_paw.png";

const MainHeader = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to FreeVet</h1>
      <p className={styles.description}>
        Сервис экосистемы TailBook, предоставляющий возможность бесплатно задавать вопросы квалифицированным опытным ветеринарным врачам и получить ответы на них
      </p>
      <div className={styles.imagesContainer}>
        <img src={leftPaw} alt="Left Paw" className={styles.leftPaw} />
        <img src={catAndDog} alt="Cat and Dog" className={styles.mainImage} />
        <img src={rightPaw} alt="Right Paw" className={styles.rightPaw} />
      </div>
    </div>
  );
};

export default MainHeader;
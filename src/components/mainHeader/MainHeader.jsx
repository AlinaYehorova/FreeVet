import React from 'react';
import '../../App.css';
import styles from './mainHeader.module.css';
import leftPaw from "../../assets/main_header_img/path_to_left_paw.png"; // Замените на правильный путь
import catAndDog from "../../assets/main_header_img/path_to_cat_and_dog.png"; // Замените на правильный путь
import rightPaw from "../../assets/main_header_img/path_to_right_paw.png"; // Замените на правильный путь
import texts from '../../utils/ru_text'; // Импортируйте ваш файл с текстами

const MainHeader = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{texts.mainHeader.title}</h1>
      <p className={styles.description}>
        {texts.mainHeader.description}
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

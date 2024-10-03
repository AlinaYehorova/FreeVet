// CustomPetCard.jsx
import React from 'react';
import '../../App.css';
import styles from './CustomPetCard.module.css';
import CustomStickTitle from '../customStickTitle/CustomStickTitle';

const CustomPetCard = ({ name, type, weight, gender, imageUrl, statusMessage, link }) => {
  return (
    <a href={link} className={styles.customPetCard}>
      <div className={styles.customPetCardContent}>
        <img src={imageUrl} alt={name} className={styles.petImage} />
        <div className={styles.petDetails}>
          <h3 className={styles.petName}>{name}</h3>
          <p className={styles.petInfo}>{type} {weight} г {gender}</p>
          {statusMessage && (
            <CustomStickTitle text={statusMessage} /> 
          )}
        </div>
      </div>
    </a>
  );
};

export default CustomPetCard;

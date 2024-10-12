import React from 'react';
import '../../App.css';
import styles from './customPetCard.module.css';
import texts from '../../utils/ru_text';


const CustomPetCard = ({
  name,
  type,
  weight,
  gender,
  imageUrl,
  statusMessage,
  link,
  imageWidth,
  StatusComponent, // Компонент для отображения статуса
}) => {
  return (
    <a href={link} className={styles.customPetCard}>
      <div className={styles.customPetCardContent}>
        <img
          src={imageUrl}
          alt={name}
          className={styles.petImage}
          style={{ width: imageWidth, height: 'auto' }}
        />
        <div className={styles.petDetails}>
          <h3 className={styles.petName}>{name}</h3>
          <p className={styles.petInfo}>
            <span className={styles.petType}>{type}</span>
            <span className={styles.petWeightAndGender}>{weight} г {gender}</span>
          </p>
          {statusMessage && StatusComponent && (
            <div className={styles.statusContainer}>
            <StatusComponent text={`${texts.customPetCard.statusMessage} ${statusMessage}`} />
          </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default CustomPetCard;

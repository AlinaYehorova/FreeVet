// CustomPetCard.jsx
import React from 'react';
import '../../App.css';
import styles from './customPetCard.module.css';

const CustomPetCard = ({ name, type, weight, gender, imageUrl, statusMessage, link, imageWidth, StatusComponent }) => {
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
          <span className={styles.petDetails}>{weight} г {gender}</span>
          </p>
          {/* {statusMessage && (
  <div className={styles.statusContainer}>
    <CustomStickTitle text={statusMessage} />
  </div>
)} */}
           {statusMessage && StatusComponent && (
            <div className={styles.statusContainer}>
              <StatusComponent text={statusMessage} />
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default CustomPetCard;
// // CustomPetCard.jsx
// import React from 'react';
// import '../../App.css';
// import styles from './CustomPetCard.module.css';
// import CustomStickTitle from '../customStickTitle/CustomStickTitle';

// const CustomPetCard = ({ name, type, weight, gender, imageUrl, statusMessage, link }) => {
//   return (
//     <a href={link} className={styles.customPetCard}>
//       <div className={styles.customPetCardContent}>
//         <img src={imageUrl} alt={name} className={styles.petImage} />
//         <div className={styles.petDetails}>
//           <h3 className={styles.petName}>{name}</h3>
//           <p className={styles.petInfo}>{type} {weight} г {gender}</p>
//           {statusMessage && (
//             <CustomStickTitle text={statusMessage} /> 
//           )}
//         </div>
//       </div>
//     </a>
//   );
// };

// export default CustomPetCard;

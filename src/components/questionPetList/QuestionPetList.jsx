import s from './QuestionPetList.module.css';
import { useState, useEffect } from 'react';

const QuestionPetList = ({ categories, onSelectImage, resetSelection }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (resetSelection) {
      setSelectedImage(null); // Сбрасываем выбранное животное при сбросе
    }
  }, [resetSelection]);

  const handleImageClick = (categoryIndex, imageIndex, type) => {
    const selected = `${categoryIndex}-${imageIndex}`; // уникальный идентификатор для выбранного животного
    if (selectedImage === selected) {
      setSelectedImage(null); // если кликаем на выбранное животное, отменяем выбор
      onSelectImage(null); // сбрасываем выбранное животное
    } else {
      setSelectedImage(selected); // устанавливаем новое выбранное животное
      onSelectImage(type); // передаем тип выбранного животного
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.questionTitle}>
        Животные <br /> с цифровыми ветеринарными книжками
      </h2>
      <div className="categoriesList">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={s.category}>
            <div className={s.categoriesTitleContainer}>
              <h3 className={s.categoriesTitle}>{category.title}</h3>
              <div className={s.heartCircle}>
                <svg
                  className={s[category.svgcolor]}
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.199707 4.27794C0.199707 4.20594 0.199707 4.13994 0.199707 4.06794C0.211707 4.00194 0.229707 3.94194 0.229707 3.87594C0.253707 3.40794 0.355707 2.95194 0.553707 2.52594C1.30971 0.935944 2.56971 0.0659439 4.34571 0.0179439C5.70171 -0.0180561 6.98571 0.665944 7.79571 1.75794C7.82571 1.79994 7.86171 1.84194 7.89771 1.88994C7.93971 1.83594 7.96371 1.80594 7.98771 1.77594C8.61171 0.893944 9.50571 0.197944 10.5797 0.0479439C14.1857 -0.4440561 16.5017 2.94594 15.2117 5.84394C14.7137 6.95994 13.9577 7.88994 13.0997 8.73594C11.7197 10.0979 10.2317 11.0159 8.61171 12.0179C8.14971 12.3059 7.54971 12.2639 7.11171 12.0179C6.18771 11.5079 5.41371 11.0099 4.53771 10.3199C3.40971 9.43194 2.34771 8.48394 1.48371 7.33194C0.883707 6.53394 0.397707 5.67594 0.253707 4.66194C0.235707 4.53594 0.217707 4.40394 0.199707 4.27794Z" />
                </svg>
              </div>
            </div>
            <div className={s.categoryImages}>
              {category.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className={s.imageContainer}
                  onClick={() =>
                    handleImageClick(categoryIndex, imageIndex, image.type)
                  }
                >
                  <img src={image.src} alt={`${category.title} ${imageIndex}`} />
                  <div
                    className={`${s.circle} ${
                      selectedImage === `${categoryIndex}-${imageIndex}` ? s.selected : ''
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPetList;

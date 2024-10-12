import React from 'react';
import CustomInput from '../../customInput/CustomInput';
import styles from './accordion.module.css';
import texts from '../../utils/ru_text'; // Импортируйте объект с текстами

const AccordionSection = ({ title, isOpen, onClick, inputs, inputValues, onInputChange }) => {
  return (
    <div
      className={`${styles.accordionSection} ${
        isOpen ? styles.accordionSectionOpen : styles.accordionSectionClosed
      }`}
      onClick={onClick} // Перемещаем обработчик клика на всю секцию
    >
      <h3 className={styles.accordionTitle}>
        {texts[title] || title} {/* Используем текст из объекта, если он доступен */}
      </h3>

      {isOpen && (
        <div className={styles.accordionContent}>
          {inputs.map((inputData, index) => (
            <div key={index}>
              <label>{texts[inputData.label] || inputData.label}</label> {/* Динамическая метка */}
              <CustomInput
                placeholder={texts[inputData.placeholder.toLowerCase()] || inputData.placeholder} // Динамический плейсхолдер
                backgroundColor="rgba(42, 157, 143, 0.09)"
                border="1px solid var(--color-main)"
                borderRadius="5px"
                padding="10px"
                color="green"
                width="100%"
                value={inputValues[index]} // Устанавливаем значение инпута
                onChange={(e) => onInputChange(index, e.target.value)} // Обработка изменения
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;

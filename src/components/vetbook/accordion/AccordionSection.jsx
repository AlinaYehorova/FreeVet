import React from 'react';
import CustomInput from '../../customInput/CustomInput';
import s from './accordion.module.css'; // Проверьте, что это имя точно совпадает с вашим импортом
import texts from '../../utils/ru_text'; // Импортируем объект с текстами

const AccordionSection = ({ title, isOpen, onClick, inputs, inputValues, onInputChange }) => {
  return (
    <div
      className={`${s.accordionSection} ${isOpen ? s.accordionSectionOpen : s.accordionSectionClosed}`} // Используем имя 's'
      onClick={onClick}
    >
      <h3 className={s.accordionTitle}>
        {texts[title] || title} {/* Используем текст из объекта, если он доступен */}
      </h3>

      {isOpen && (
        <div className={s.accordionContent}>
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

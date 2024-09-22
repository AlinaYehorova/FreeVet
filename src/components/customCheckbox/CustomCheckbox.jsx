import React, { useState } from 'react';
import s from './customCheckbox.module.css';
import checkbox_icon from '../../assets/checkbox/checkbox_icon.svg';  // Иконка для пустого чекбокса
import checked_icon from '../../assets/checkbox/checked_icon.svg';    // Иконка для отмеченного чекбокса

const CustomCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  // Обработчик для изменения состояния чекбокса
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={s.customCheckbox} onClick={handleCheckboxChange} style={{ position: 'relative' }}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={s.checkboxInput}
        style={{ display: 'none' }}  // Скрываем стандартный чекбокс
      />
      <img
        src={checkbox_icon}
        alt="checkbox"
        className={s.checkboxIcon}
      />
      {isChecked && (
        <img
          src={checked_icon}
          alt="checked"
          className={s.checkedIcon}  // Новый класс для стиля
          style={{ position: 'absolute', top: "4px", left: "5px" }} // Позиционируем наложение
        />
      )}
    </div>
  );
};

export default CustomCheckbox;

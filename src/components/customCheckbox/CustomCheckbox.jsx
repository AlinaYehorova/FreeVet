import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';  // Импортируем prop-types для валидации пропсов
import s from './customCheckbox.module.css';
import checkbox_icon from '../../assets/checkbox/checkbox_icon.svg';  // Иконка для пустого чекбокса
import checked_icon from '../../assets/checkbox/checked_icon.svg';    // Иконка для отмеченного чекбокса
import texts from '../../utils/ru_text'; // Импортируем файл с текстами

const CustomCheckbox = forwardRef(({ checked, onChange, disabled, name }, ref) => {
  // Обработчик клика
  const handleClick = (e) => {
    if (!disabled) {
      // Передаем имя и текущее состояние checked как событие
      onChange({ target: { name, checked: !checked } });
    }
  };

  return (
    <div
      className={`${s.customCheckbox} ${disabled ? s.disabled : ''}`} // Добавляем стили для disabled состояния
      onClick={handleClick}
      style={{ position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer' }}
      title={checked ? texts.customCheckbox.checkedTooltip : texts.customCheckbox.uncheckedTooltip} // Подсказка при наведении
    >
      <input
        type="checkbox"
        checked={checked}  // Привязываем значение к состоянию
        onChange={onChange}  // Вызов изменения состояния через onChange
        name={name}
        disabled={disabled}
        ref={ref} // Присваиваем ref
        className={s.checkboxInput}
        style={{ display: 'none' }}  // Скрываем стандартный чекбокс
      />
      <img
        src={checkbox_icon}
        alt="checkbox"
        className={s.checkboxIcon}
      />
      {checked && (
        <img
          src={checked_icon}
          alt="checked"
          className={s.checkedIcon}  // Новый класс для стиля
          style={{ position: 'absolute', top: "4px", left: "5px" }} // Позиционируем наложение
        />
      )}
    </div>
  );
});

// Добавляем валидацию пропсов
CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,      // checked передается как булевый тип
  onChange: PropTypes.func.isRequired,     // onChange передается как функция
  disabled: PropTypes.bool,                // disabled может быть булевым типом
  name: PropTypes.string.isRequired        // name передается как строка и является обязательным
};

export default CustomCheckbox;

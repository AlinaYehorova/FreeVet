import React from 'react';
import { Link } from 'react-router-dom';
import s from './customButton.module.css';

const CustomButton = ({
  backgroundColor,
  border,
  padding,
  text = 'Submit',
  link = '/',
  color,
  disabled, // передаём disabled как проп
}) => {
  // Проверяем наличие родительского класса `disabled`
  const buttonClasses = disabled ? `${s.button} ${s.disabled}` : s.button;

  return (
    <Link
      to={disabled ? '#' : link} // Блокируем переход, если кнопка неактивна
      className={buttonClasses} // Применяем классы с учётом состояния
      style={{
        backgroundColor: disabled ? backgroundColor  : backgroundColor || 'var(--color-main)', // Цвет для неактивного состояния
        border: border || 'none',
        padding: padding || '16px 51px',
        color: color || 'var(--color-text-white)',
        lineHeight: 1.1,
        pointerEvents: disabled ? 'none' : 'auto', // Отключаем взаимодействие
      }}
    >
      {text}
    </Link>
  );
};

export default CustomButton;

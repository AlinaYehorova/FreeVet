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
}) => {
  return (
    <Link 
      to={link} 
      className={s.button} 
      style={{
        backgroundColor: backgroundColor || 'var(--color-main)',
        border: border || 'none',
        padding: padding || '16px 51px',
        color: color || 'var(--color-text-white)', 
      }}
    >
      {text}
    </Link>
  );
};

export default CustomButton;

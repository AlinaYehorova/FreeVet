import React from 'react';
import s from './CustomStickTitle.module.css';

const CustomStickTitle = ({
  backgroundColor,
  border,
  padding,
  text = 'Пользователь', 
  color,
  borderRadius 
}) => {
  return (
    <div 
      className={s.stickTitle} 
      style={{
        backgroundColor: backgroundColor || 'white',
        border: border || '1 px solid var(--color-main)',
        padding: padding || '5px 15px',
        color: color || 'var(--color-main)', 
        lineHeight: 1.1,
        borderRadius: borderRadius || '10px' 
      }}
    >
      {text}
    </div>
  );
};

export default CustomStickTitle;

import React from 'react';
import s from './customStickTitle.module.css';

const CustomStickTitle = ({
  backgroundColor,
  border,
  padding,
  text = 'Пользователь', 
  color,
  borderRadius,
  style,
}) => {
  return (
    <div 
      className={s.stickTitle} 
      style={{
        backgroundColor: backgroundColor || 'white',
        border: border || '1px solid var(--color-main)',
        padding: padding || '5px 15px',
        color: color || 'var(--color-main)', 
        lineHeight: 1.1,
        borderRadius: borderRadius || '10px' ,
        ...style
      }}
    >
      {text}
    </div>
  );
};

export default CustomStickTitle;

import s from './lineHeader.module.css';
import React from 'react';

const LineHeader = ({ showMiddleLine = true, background = {} }) => {
  return (
    <div className={s.lineHeader}>
      <div 
        className={`${s.line} ${s.left}`} 
        style={{ backgroundColor: background.left || 'var(--color-main)' }} // дефолтный цвет
      ></div>
      {showMiddleLine && (
        <div 
          className={`${s.line} ${s.middle}`} 
          style={{ backgroundColor: background.middle || 'var(--color-main)' }} // дефолтный цвет
        ></div>
      )}
      <div 
        className={`${s.line} ${s.right}`} 
        style={{ backgroundColor: background.right || 'var(--color-line)' }} // дефолтный цвет для правой линии
      ></div>
    </div>
  );
};

export default LineHeader;


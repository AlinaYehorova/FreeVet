import React from 'react';
import s from './lineHeader.module.css';

const LineHeader = ({ showMiddleLine = true, left = 'var(--color-main', middle = 'var(--color-line)', right = 'var(--color-line)' }) => {
  return (
    <div className={s.lineHeader}>
      <div className={s.line + ' ' + s.left} style={{ backgroundColor: left }}></div>
      {showMiddleLine && <div className={s.line + ' ' + s.middle} style={{ backgroundColor: middle }}></div>}
      <div className={s.line + ' ' + s.right} style={{ backgroundColor: right }}></div>
    </div>
  );
}

export default LineHeader;



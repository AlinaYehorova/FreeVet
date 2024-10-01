import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import s from './customTextarea.module.css';

const CustomTextarea = forwardRef(({
  value,
  onChange,
  rows = 8,
  cols = 50,
  placeholder = 'Введите текст',
  width,
  backgroundColor,
  border,
  padding,
  color,
  borderRadius,
  style,
}, ref) => {
  return (
    <div className={s.customTextarea}>
      <textarea
        ref={ref} // добавлен forwardRef
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        style={{
          width: width || '335px',
          backgroundColor: backgroundColor || 'white',
          border: border || '0.5px solid',
          padding: padding || '10px',
          color: color || 'var(--color-text-grey)',
          lineHeight: 1.1,
          borderRadius: borderRadius || '20px',
          resize: 'none',
          ...style,
        }}
      />
    </div>
  );
});

CustomTextarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func, // Теперь не обязательно
  rows: PropTypes.number,
  cols: PropTypes.number,
  placeholder: PropTypes.string,
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  padding: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  borderRadius: PropTypes.string,
  style: PropTypes.object,
};

CustomTextarea.defaultProps = {
  value: '',
  onChange: () => {}, // Пустая функция по умолчанию, если onChange не передан
  rows: 8,
  cols: 50,
  placeholder: 'Введите текст',
};

export default CustomTextarea;

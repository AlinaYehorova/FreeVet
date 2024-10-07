import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import s from './customTextarea.module.css';

const CustomTextarea = forwardRef(({
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
  ...rest // остальные пропсы для работы с react-hook-form
}, ref) => {
  return (
    <div className={s.customTextarea}>
      <textarea
        ref={ref} // forwardRef для работы с react-hook-form
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
        {...rest} // Spread для всех других пропсов (например, onChange, value)
      />
    </div>
  );
});

CustomTextarea.propTypes = {
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
  rows: 8,
  cols: 50,
  placeholder: 'Введите текст',
};

export default CustomTextarea;

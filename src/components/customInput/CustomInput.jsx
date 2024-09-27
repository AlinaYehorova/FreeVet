import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import s from './customInput.module.css';

const CustomInput = forwardRef((props, ref) => {
  const {
    backgroundColor,
    border,
    borderColor,
    borderRadius,
    padding,
    placeholder,
    color,
    width,
    margin,
    ...rest
  } = props;

  return (
    <input
      className={s.customInput} 
      style={{
        backgroundColor: backgroundColor || 'var(--color-text-white)',
        border: border || '0.5px solid',
        borderColor: borderColor || 'var(--color-input-bg-grey)',
        borderRadius: borderRadius || '10px',
        padding: padding || '12px 10px',
        color: color || 'var(--color-input-bg-grey)',
        width: width || '100%',
        margin: margin || '0 0 5px 0',
        lineHeight: 1.1,
      }}
      placeholder={placeholder}
      ref={ref} // Forward the ref to the input
      {...rest} // Apply the rest of the props (like required)
    />
  );
});

CustomInput.propTypes = {
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  color: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.string,
};

export default CustomInput;

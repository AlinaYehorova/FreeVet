import s from './customInput.module.css'

const CustomInput = ({
  backgroundColor,
  border,
  borderColor,
  borderRadius,
  padding,
  placeholder,
  color,
  width,
}) => {
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
        width: width,
        lineHeight: 1.1,
      }}
      placeholder={placeholder}
      />
  );
};

export default CustomInput;

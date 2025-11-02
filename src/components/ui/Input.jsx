import React from 'react';

const Input = ({ 
  label, 
  error, 
  type = 'text',
  className = '',
  ...props 
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label>{label}</label>}
      <input type={type} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;
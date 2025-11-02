import React from 'react';

const CheckBox = ({ 
  label, 
  checked, 
  onChange,
  className = '' 
}) => {
  return (
    <label className={`checkbox ${className}`}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
      />
      <span>{label}</span>
    </label>
  );
};

export default CheckBox;
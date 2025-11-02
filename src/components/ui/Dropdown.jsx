import React from 'react';

const Dropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder,
  label,
  className = '' 
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label>{label}</label>}
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
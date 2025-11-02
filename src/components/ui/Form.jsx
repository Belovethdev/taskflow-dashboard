import React from 'react';

const Form = ({ 
  children, 
  onSubmit, 
  title,
  className = '' 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${className}`}>
      {title && <h3>{title}</h3>}
      {children}
    </form>
  );
};

export default Form;
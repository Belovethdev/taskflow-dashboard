import React from 'react';

const Card = ({ 
  title, 
  children, 
  footer, 
  variant = 'default',
  className = '' 
}) => {
  return (
    <div className={`card card-${variant} ${className}`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
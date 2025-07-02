import React from 'react';
import './Button.css';

export const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

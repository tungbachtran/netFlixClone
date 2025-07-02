import React from 'react';
import './Input.css';

export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  error,
  ...props 
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${error ? 'input--error' : ''}`}
        {...props}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "font-bold text-sm py-2 px-4 rounded-md transition-colors duration-300";

  const variants = {
    primary: "bg-orange-standard text-white hover:bg-orange-dark",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const variantClasses = variants[variant] || variants.primary;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
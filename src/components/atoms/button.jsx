import React from 'react';

const Button = ({ children, onClick, variant = 'primary', ...props }) => {
  const baseClasses = "font-bold py-2 px-4 rounded";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    // Agrega más variantes según necesites
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
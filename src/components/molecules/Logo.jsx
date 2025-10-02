import React from 'react';
import logoIcon from '../../assets/img/icon.png'; 

const Logo = () => {
  return (
    <a href="/" className="flex items-center space-x-2">
      <img src={logoIcon} alt="Logo de BlackMarkpet" className="ml-0 items-start h-20" />
      <span className="text-white text-2xl font-semibold">BlackMarkpet</span>
    </a>
  );
};

export default Logo;
import React from 'react';
import { Link } from 'react-router-dom';
// Asegúrate de que la ruta a tu imagen sea correcta
import heroImage from '../../assets/img/Dogs_Black_background_Spaniel_539102_3840x2160.jpg';

const Hero = () => {
  return (
    <div className="relative h-[600px] w-full">
      {/* 1. Imagen de Fondo */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Capa oscura para que el texto resalte */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* 2. Contenido CENTRADO */}
      {/* 'flex flex-col items-center justify-center' es la magia que centra todo */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide drop-shadow-lg">
          BlackMark<span className="text-orange-standard">Pet</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
          Todo lo que tu mejor amigo necesita, con la calidad que merece.
        </p>
        
        <Link 
          to="/catalogo" 
          className="px-8 py-4 bg-orange-standard hover:bg-orange-dark text-white font-bold rounded-full text-lg transition-transform hover:scale-105 shadow-lg"
        >
          Comprar Ahora
        </Link>

      </div>
    </div>
  );
};

export default Hero;
import React from 'react';
import heroImage from '../../assets/img/Dogs_Black_background_Spaniel_539102_3840x2160.jpg';

const Hero = () => {
  const heroStyles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
  };

  return (
    <div className="bg-center bg-no-repeat bg-cover relative h-[50vh]" style={heroStyles}>
      <div className="text-center text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-bold">Bienvenido a BlackMarkpet</h1>
        <p className="text-2xl">Tu tienda de mascotas en línea.</p>
      </div>
    </div>
  );
};

export default Hero;
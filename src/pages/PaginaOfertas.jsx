import React from 'react';
import OfertasDestacadas from '../components/organisms/OfertasDestacadas';

const PaginaOfertas = () => {
  return (
    <div className="bg-neutral-900 min-h-screen">
        <div className="py-12">
            <h1 className="text-4xl font-bold text-white text-center mb-4">Todas Nuestras Ofertas</h1>
            <p className="text-center text-neutral-400 mb-10">Aprovecha los mejores precios para tus mascotas.</p>
            <OfertasDestacadas />
        </div>
    </div>
  );
};

export default PaginaOfertas;
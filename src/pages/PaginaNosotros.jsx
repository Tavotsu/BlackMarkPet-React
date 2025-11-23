import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-neutral-900 text-white">
      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl pt-10">
            Sobre BlackMarkpet
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Nuestra pasión son las mascotas. Creemos que cada una de ellas merece lo mejor, y nuestra misión es proporcionárselo a través de productos de alta calidad y un servicio excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-orange-standard mb-4">Nuestra Misión</h2>
            <p className="text-gray-300">
              Ofrecer una selección curada de los mejores productos para mascotas, garantizando su bienestar y felicidad. Nos esforzamos por ser la tienda en línea de confianza para todos los dueños de mascotas, proporcionando calidad, conveniencia y un servicio al cliente inigualable.
            </p>
          </div>
          <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-orange-standard mb-4">Nuestra Visión</h2>
            <p className="text-gray-300">
              Ser líderes en el mercado de productos para mascotas, innovando constantemente y expandiendo nuestra oferta para satisfacer todas las necesidades de nuestros clientes y sus fieles compañeros. Aspiramos a crear una comunidad donde los amantes de los animales puedan encontrar todo lo que necesitan en un solo lugar.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white text-center mb-10">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-white mb-2">Gustavo Santana</h3>
              <p className="text-orange-standard font-medium mb-3">Co-Fundador y CEO</p>
              <p className="text-gray-400">
                Apasionado por los animales desde niño, Gustavo lidera la visión de la empresa con un enfoque en la calidad y la satisfacción del cliente.
              </p>
            </div>
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-white mb-2">Cristóbal Valdebenito</h3>
              <p className="text-orange-standard font-medium mb-3">Co-Fundador y CTO</p>
              <p className="text-gray-400">
                El cerebro tecnológico detrás de nuestra plataforma. Cristóbal se asegura de que tu experiencia de compra sea fluida, segura y agradable.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
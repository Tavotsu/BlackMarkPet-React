import React from 'react';
import ProductCard from '../molecules/ProductCard';

const featuredProducts = [
    {
        href: "/catalogo",
        imgSrc: "https://cdn.shopify.com/s/files/1/0102/3742/files/Ganador_936ee4de-362b-4b41-894f-0fbad4ba9e04.jpg?v=1611158640",
        title: "Comida Premium",
        description: "La mejor nutrición para tu fiel amigo."
    },
    {
        href: "/catalogo",
        imgSrc: "https://st3.depositphotos.com/1593759/37151/i/450/depositphotos_371514964-stock-photo-pet-accessories-concept-dry-food.jpg",
        title: "Accesorios",
        description: "Todo lo que necesitas para el día a día."
    },
    {
        href: "/catalogo",
        imgSrc: "https://acdn-us.mitiendanube.com/stores/880/994/products/mb-higiene-16-66c6c089cdaecefa6817006689517501-1024-1024.jpg",
        title: "Higiene y Cuidado",
        description: "Mantén a tu mascota limpia y saludable."
    }
];

const ProductHighlights = () => {
  return (
    <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Nuestros Productos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.title}
            href={product.href}
            imgSrc={product.imgSrc}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </main>
  );
};

export default ProductHighlights;
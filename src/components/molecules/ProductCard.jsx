import React from 'react';

const ProductCard = ({ href, imgSrc, title, description }) => {
  return (
    <a 
      href={href} 
      className="group block bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
    >
      <img src={imgSrc} alt={title} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </a>
  );
};

export default ProductCard;
// src/components/molecules/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, imageUrl, title, description }) => {
  return (
    <Link to={`/blog/${id}`} className="group relative block bg-black rounded-lg shadow-lg overflow-hidden h-80">
      <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300" />
      <div className="relative p-8 flex flex-col justify-end h-full">
        <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
        <p className="text-neutral-300 mb-4">{description}</p>
        <span className="font-semibold text-orange-standard group-hover:underline">Ver noticia →</span>
      </div>
    </Link>
  );
};

export default BlogCard;
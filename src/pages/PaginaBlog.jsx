import React from 'react';
import BlogCard from '../components/molecules/BlogCard';

// Datos de ejemplo para los blogs. Más adelante, esto podría venir de una API.
const blogsData = [
  {
    id: 1,
    title: 'Pronto! Tratamiento veterinario en la tienda',
    description: 'Accede a servicios profesionales directamente en nuestra tienda.',
    imageUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Campaña de Adopción Exitosamente Culminada',
    description: 'Más de 200 animales encontraron un nuevo hogar gracias a nuestra campaña.',
    imageUrl: 'https://i.ytimg.com/vi/7lfy6NV9u24/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AGuCYAC0AWKAgwIABABGD4gZShRMA8=&rs=AOn4CLDJhMD5uqPl8q7noHRr7FOXVm05hw',
  }
];

const BlogsPage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-2 pt-15">Noticias y Consejos</h1>
        <p className="text-white mb-10">Mantente al día con nuestras últimas novedades y consejos para el cuidado de tu mascota.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogsData.map(blog => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.imageUrl}
          />
        ))}
      </div>
    </main>
  );
};

export default BlogsPage;
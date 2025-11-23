import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Datos de ejemplo para los blogs.
// NOTA: Para un proyecto real, estos datos deberían venir de una API o una fuente de datos más robusta.
const blogsData = [
  {
    id: 1,
    title: 'Pronto! Tratamiento veterinario en la tienda',
    imageUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    description: 'Accede a servicios profesionales directamente en nuestra tienda.',
    fullContent: (
      <>
        <p className="mb-4 text-neutral-300 ">
          ¡Estamos emocionados de anunciar una nueva adición a nuestros servicios en BlackMarkpet!
          Pronto, ofreceremos servicios de tratamiento veterinario directamente en nuestra tienda.
          Sabemos lo importante que es la salud de tus mascotas, y queremos facilitarte el acceso
          a atención profesional sin tener que hacer viajes adicionales.
        </p>
        <p className="mb-4 text-neutral-300">
          Nuestro objetivo es brindar un servicio integral, donde puedas encontrar todo lo que
          necesitas para tus compañeros peludos en un solo lugar. Esto incluirá chequeos de rutina,
          vacunaciones, y asesoramiento sobre el cuidado preventivo.
        </p>
        <p className="mb-4 text-neutral-300">
          Mantente atento a nuestras redes sociales y a esta sección de blogs para conocer la fecha
          exacta de lanzamiento y más detalles sobre los servicios disponibles. ¡Tu mascota se lo merece!
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: 'Campaña de Adopción Exitosamente Culminada',
    imageUrl: 'https://i.ytimg.com/vi/7lfy6NV9u24/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AGuCYAC0AWKAgwIABABGD4gZShRMA8=&rs=AOn4CLDJhMD5uqPl8q7noHRr7FOXVm05hw',
    description: 'Más de 200 animales encontraron un nuevo hogar gracias a nuestra campaña.',
    fullContent: (
      <>
        <p className="mb-4 text-neutral-300">
          Con gran alegría, anunciamos la culminación exitosa de nuestra reciente campaña de adopción de mascotas.
          Gracias al increíble apoyo de nuestra comunidad y el arduo trabajo de nuestros voluntarios,
          **más de 200 animales** encontraron un hogar amoroso y familias que los acogerán.
        </p>
        <p className="mb-4 text-neutral-300">
          La campaña, que duró varias semanas, contó con la participación de refugios locales y organizaciones
          dedicadas al bienestar animal. Los eventos de adopción se llevaron a cabo en nuestra tienda y en diversos
          puntos de la ciudad, logrando conectar a muchas mascotas necesitadas con personas dispuestas a darles
          una segunda oportunidad.
        </p>
        <p className="mb-4 text-neutral-300">
          Queremos agradecer a todos los que abrieron sus corazones y sus hogares. Cada adopción es una historia
          de éxito y un paso más hacia un mundo donde menos animales sufren. ¡Esperamos seguir contando con su
          apoyo en futuras iniciativas!
        </p>
      </>
    ),
  }
];

const PaginaDetalleBlog = () => {
  const { id } = useParams(); // Obtiene el ID del blog de los parámetros de la URL
  const blog = blogsData.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      // También bajamos el mensaje de error por si acaso
      <div className="text-white text-center py-20 pt-40">
        <h1 className="text-4xl font-bold">Noticia no encontrada</h1>
        <p className="text-xl mt-4">La noticia que buscas no existe.</p>
        <Link to="/blogs" className="mt-8 inline-block bg-orange-standard hover:bg-orange-dark text-white font-bold py-2 px-6 rounded transition duration-300">
          Volver a Blogs
        </Link>
      </div>
    );
  }

  return (
    // AQUÍ ESTÁ EL CAMBIO: cambié 'py-12' por 'pt-40 pb-12' para bajar todo el bloque
    <main className="max-w-4xl mx-auto px-4 pt-40 pb-12 flex-grow">
      <div className="text-center mb-8">
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-80 object-cover rounded-lg mb-6 shadow-lg" />
        <h1 className="text-4xl font-bold mb-4 text-white">{blog.title}</h1>
        <p className="text-neutral-400 text-lg">{blog.description}</p>
      </div>

      <div className="bg-neutral-800 p-8 rounded-lg shadow-md text-left leading-relaxed">
        {blog.fullContent}
      </div>

      <div className="mt-10 text-center">
        <Link to="/blogs" className="inline-block bg-orange-standard hover:bg-orange-dark text-white font-bold py-2 px-6 rounded transition duration-300">
          ← Volver a todas las noticias
        </Link>
      </div>
    </main>
  );
};

export default PaginaDetalleBlog;
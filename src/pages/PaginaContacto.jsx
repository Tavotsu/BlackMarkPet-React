
import React, { useState } from 'react';
import Swal from 'sweetalert2'; 

const PaginaContacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    Swal.fire({
        title: "¡Mensaje Enviado!",
        text: "Gracias por contactarnos. Te responderemos a la brevedad.",
        icon: "success",
        background: '#333',
        color: '#fff',
        confirmButtonColor: '#f97316' 
    });

    
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white pt-10">Contáctanos</h1>
        <p className="text-neutral-400 mt-2">¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>
      </div>
      <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-standard"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-standard"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Tu Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-standard"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-orange-standard hover:bg-orange-dark text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
            >
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PaginaContacto;
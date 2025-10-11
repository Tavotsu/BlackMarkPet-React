import React from 'react';
import ContactForm from '../components/organisms/ContactForm';

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Contáctanos
        </h1>
        <p className="text-gray-300 text-center mb-10">
          ¿Tienes alguna pregunta o comentario? Rellena el formulario y nos pondremos en contacto contigo.
        </p>
        <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
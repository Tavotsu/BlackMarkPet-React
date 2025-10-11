import React, { useState } from 'react';
import FormField from '../atoms/FormField';
import Button from '../atoms/Button';

const ContactForm = () => {
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
    // Aquí va la lógica para enviar el formulario a un backend o servicio.
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="name"
        label="Nombre Completo"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <FormField
        id="email"
        label="Correo Electrónico"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormField
        id="message"
        label="Mensaje"
        value={formData.message}
        onChange={handleChange}
        isTextArea
        required
      />
      <div className="text-center">
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          Enviar Mensaje
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
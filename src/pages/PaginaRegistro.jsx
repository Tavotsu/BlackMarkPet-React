// src/pages/PaginaRegistro.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaginaRegistro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const allowedDomains = ['duocuc.cl', 'profesor.duoc.cl'];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (name.length < 4) {
      setError('El nombre debe tener al menos 4 caracteres.'); return;
    }
    if (!validateEmail(email)) {
      setError('El correo debe pertenecer a @duocuc.cl o @profesor.duoc.cl.'); return;
    }
    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluyendo un número y un símbolo especial.'); return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
      setError('El correo electrónico ya está registrado.'); return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire({
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
        icon: "success",
        background: '#333',
        color: '#fff'
    });
    navigate('/login');
  };

  return (
    <main className="flex justify-center items-center flex-grow">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white">Crear Cuenta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300">Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-standard" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Correo Electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-standard" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-standard" required />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full py-2 px-4 font-bold text-white bg-orange-standard rounded-md hover:bg-orange-dark transition-colors duration-300">
            Registrarse
          </button>
        </form>
        <p className="text-sm text-center text-neutral-400">
          ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-orange-standard hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </main>
  );
};

export default PaginaRegistro;
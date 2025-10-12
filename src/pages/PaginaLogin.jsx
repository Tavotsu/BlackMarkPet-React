// src/pages/PaginaLogin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const ADMIN_EMAIL = 'admin@blackmarkpet.cl';
    const ADMIN_PASS = 'admin123*';
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (!user && email === ADMIN_EMAIL && password === ADMIN_PASS) {
      user = { name: 'Admin', email: ADMIN_EMAIL, role: 'admin' };
    } else if (user && user.email === ADMIN_EMAIL) {
      user.role = 'admin';
    }

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      Swal.fire({
        title: `¡Bienvenido, ${user.name}!`,
        text: "Has iniciado sesión correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: '#333', // Fondo oscuro para la alerta
        color: '#fff'     // Texto blanco
      }).then(() => {
        navigate('/');
        window.location.reload();
      });

    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <main className="flex justify-center items-center flex-grow">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Iniciar Sesión
          </button>
        </form>
        <p className="text-sm text-center text-neutral-400">
          ¿No tienes una cuenta? <Link to="/registro" className="font-medium text-orange-standard hover:underline">Regístrate</Link>
        </p>
      </div>
    </main>
  );
};

export default PaginaLogin;
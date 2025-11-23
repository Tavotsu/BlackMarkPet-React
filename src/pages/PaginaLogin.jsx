import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // CONEXIÓN CON BACKEND
      const response = await axios.post('https://backend-bmp-express-production.up.railway.app/api/auth/login', {
        email,
        password
      });

      const userData = response.data.user; // El backend debe devolver el objeto usuario con ID
      
      // Guardamos el usuario real de la BD en localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));

      Swal.fire({
        title: `¡Bienvenido, ${userData.name}!`,
        text: "Has iniciado sesión correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        confirmButtonColor: '#f97316'
      }).then(() => {
        navigate('/');
        window.location.reload(); // Para actualizar el header
      });

    } catch (err) {
      const msg = err.response?.data?.message || 'Correo o contraseña incorrectos.';
      setError(msg);
    }
  };

  return (
    <main className="flex justify-center items-center flex-grow py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300">Correo</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-neutral-700 border border-neutral-600 rounded-md focus:ring-2 focus:ring-orange-standard" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-neutral-700 border border-neutral-600 rounded-md focus:ring-2 focus:ring-orange-standard" required />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full py-2 px-4 font-bold text-white bg-orange-standard rounded-md hover:bg-orange-dark transition-colors">Entrar</button>
        </form>
        <p className="text-sm text-center text-neutral-400">¿No tienes cuenta? <Link to="/registro" className="text-orange-standard hover:underline">Regístrate</Link></p>
      </div>
    </main>
  );
};

export default PaginaLogin;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // Asegúrate de usar axios

const PaginaRegistro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validaciones (Mantenemos las mismas de tu rúbrica)
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);
  const validateEmail = (email) => {
    const domain = email.split('@')[1];
    return ['duocuc.cl', 'profesor.duoc.cl'].includes(domain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (name.length < 4) return setError('El nombre debe tener al menos 4 caracteres.');
    if (!validateEmail(email)) return setError('El correo debe ser @duocuc.cl o @profesor.duoc.cl.');
    if (!validatePassword(password)) return setError('Contraseña insegura (mín 8 caracteres, letra, número y símbolo).');

    try {
      // CONEXIÓN CON BACKEND
      await axios.post('http://localhost:3001/api/auth/register', {
        name,
        email,
        password
      });

      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Cuenta creada en la base de datos. Ahora inicia sesión.",
        icon: "success",
        confirmButtonColor: '#f97316'
      });
      navigate('/login');

    } catch (err) {
      // Manejo de errores del backend
      const msg = err.response?.data?.message || 'Error al registrar usuario.';
      setError(msg);
    }
  };

  return (
    <main className="flex justify-center items-center flex-grow py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white">Crear Cuenta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300">Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-neutral-700 border border-neutral-600 rounded-md focus:ring-2 focus:ring-orange-standard" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Correo</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-neutral-700 border border-neutral-600 rounded-md focus:ring-2 focus:ring-orange-standard" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-neutral-700 border border-neutral-600 rounded-md focus:ring-2 focus:ring-orange-standard" required />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full py-2 px-4 font-bold text-white bg-orange-standard rounded-md hover:bg-orange-dark transition-colors">Registrarse</button>
        </form>
        <p className="text-sm text-center text-neutral-400">¿Ya tienes cuenta? <Link to="/login" className="text-orange-standard hover:underline">Inicia Sesión</Link></p>
      </div>
    </main>
  );
};

export default PaginaRegistro;
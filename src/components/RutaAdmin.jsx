// src/components/RutaAdmin.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RutaAdmin = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // Si el usuario existe y su rol es 'admin', permite el acceso a las rutas anidadas.
  // De lo contrario, lo redirige a la página de inicio.
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default RutaAdmin;
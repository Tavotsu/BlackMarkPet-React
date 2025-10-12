import React from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'; 
import AdminDashboard from '../components/organisms/AdminDashboard';

const PaginaAdmin = () => {
  const location = useLocation();

  const getLinkClass = ({ isActive }) =>
    `flex items-center p-3 rounded-lg transition-colors ${
      isActive ? 'bg-orange-standard text-white' : 'text-neutral-400 hover:bg-neutral-700 hover:text-white'
    }`;

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* --- Barra Lateral --- */}
      <aside className="w-64 bg-neutral-800 p-6 flex flex-col flex-shrink-0">
        <div>
            <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
            <nav className="space-y-4">
            <NavLink to="/admin" end className={getLinkClass}>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/productos" className={getLinkClass}>
                <span>Productos</span>
            </NavLink>
            <NavLink to="/admin/usuarios" className={getLinkClass}>
                <span>Usuarios</span>
            </NavLink>
            </nav>
        </div>
        
        {/* --- Botón para Volver al Inicio --- */}
        <div className="mt-auto">
            <Link 
                to="/" 
                className="flex items-center justify-center w-full p-3 rounded-lg bg-neutral-700 text-neutral-300 hover:bg-orange-standard hover:text-white transition-colors"
            >
                <span>← Volver al Inicio</span>
            </Link>
        </div>
      </aside>

      {/* --- Contenido Principal --- */}
      <main className="flex-1 p-10">
        {location.pathname === '/admin' ? <AdminDashboard /> : <Outlet />}
      </main>
    </div>
  );
};

export default PaginaAdmin;
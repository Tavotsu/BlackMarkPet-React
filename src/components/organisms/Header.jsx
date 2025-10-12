// src/components/organisms/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../molecules/Logo';
import NavLink from '../atoms/NavLink';

const Header = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); // <-- Estado para el contador del carrito
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    // Cargar y mostrar la cantidad de items en el carrito
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);

  }, []); // Se ejecuta una vez al cargar el componente

  const handleLogout = () => {
    // ... (la función de logout no cambia)
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="py-3 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center space-x-10">
          <ul className="flex items-center space-x-10 text-white font-bold text-sm">
            {/* ... (los NavLink no cambian) ... */}
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/catalogo">Catálogo</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
            {user && user.role === 'admin' && (<NavLink to="/admin">Admin</NavLink>)}
          </ul>
          <div className="flex items-center space-x-4">
            <Link to="/carrito" className="relative text-white hover:text-orange-standard" aria-label="Ver carrito de compras">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {/* --- Contador del Carrito --- */}
              {cartCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                   {cartCount}
                 </span>
              )}
            </Link>
            
            {/* ... (la lógica de sesión no cambia) ... */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm font-medium">¡Hola, {user.name}!</span>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-2 px-4 rounded-md transition-colors duration-300">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div>
                <Link to="/login" className="bg-orange-standard text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-orange-dark transition-colors duration-300">
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
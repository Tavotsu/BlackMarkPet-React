import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../molecules/Logo';
import NavLink from '../atoms/NavLink';

const Header = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="py-3 bg-neutral-900 relative"> 
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center space-x-10">
          <ul className="flex items-center space-x-10 text-white font-bold text-sm">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/catalogo">Catálogo</NavLink>
            <NavLink to="/ofertas">Ofertas</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
            {user && user.role === 'admin' && (<NavLink to="/admin">Admin</NavLink>)}
          </ul>
          <div className="flex items-center space-x-4">
            <Link to="/carrito" className="relative text-white hover:text-orange-standard" aria-label="Ver carrito de compras">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {cartCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                   {cartCount}
                 </span>
              )}
            </Link>
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

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-800 shadow-lg z-20">
          <ul className="flex flex-col items-center space-y-4 py-4 text-white font-bold text-sm">
            <li onClick={closeMenu}><NavLink to="/">Inicio</NavLink></li>
            <li onClick={closeMenu}><NavLink to="/catalogo">Catálogo</NavLink></li>
            <li onClick={closeMenu}><NavLink to="/ofertas">Ofertas</NavLink></li>
            <li onClick={closeMenu}><NavLink to="/blogs">Blogs</NavLink></li>
            <li onClick={closeMenu}><NavLink to="/nosotros">Nosotros</NavLink></li>
            <li onClick={closeMenu}><NavLink to="/contacto">Contacto</NavLink></li>
            {user && user.role === 'admin' && (<li onClick={closeMenu}><NavLink to="/admin">Admin</NavLink></li>)}
          </ul>
          <div className="flex flex-col items-center space-y-4 py-4 border-t border-neutral-700">
            {user ? (
              <>
                <span className="text-white text-sm font-medium">¡Hola, {user.name}!</span>
                <button onClick={() => { closeMenu(); handleLogout(); }} className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-2 px-4 rounded-md transition-colors duration-300">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu} className="bg-orange-standard text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-orange-dark transition-colors duration-300">
                Iniciar Sesión
              </Link>
            )}
            <Link to="/carrito" onClick={closeMenu} className="relative text-white hover:text-orange-standard mt-2" aria-label="Ver carrito de compras">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Carrito
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
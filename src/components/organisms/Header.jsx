// src/components/organisms/Header.jsx
import React, { useState } from 'react';
import Logo from '../molecules/Logo';
import NavLink from '../atoms/NavLink';
import Button from '../atoms/Button';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Simulación del estado de login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="py-3 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Logo />

        {/* Menú de Escritorio */}
        <div className="hidden md:flex items-center space-x-10">
          <ul className="flex items-center space-x-10 text-white font-bold text-sm">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/catalogo">Catálogo</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
            <NavLink href="/nosotros">Nosotros</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </ul>
          <div className="flex items-center space-x-4">
            <a href="/carrito" className="relative text-white hover:text-orange-standard" aria-label="Ver carrito">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </a>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm font-medium">Bienvenido</span>
                <Button onClick={() => setIsLoggedIn(false)} variant="danger">
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsLoggedIn(true)} variant="primary">
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>

        {/* Botón Menú Móvil */}
        <button
          id="menuButton"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-gray-400 hover:text-orange-standard hover:border-orange-standard"
          aria-label="Abrir menú"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div id="mobileMenu" className="md:hidden bg-neutral-800 p-4 space-y-4">
          <a href="/" className="block text-white hover:text-gray-400">Inicio</a>
          <a href="/catalogo" className="block text-white hover:text-gray-400">Catálogo</a>
          <a href="/blogs" className="block text-white hover:text-gray-400">Blogs</a>
          <a href="/nosotros" className="block text-white hover:text-gray-400">Nosotros</a>
          <a href="/contacto" className="block text-white hover:text-gray-400">Contacto</a>
          <a href="/carrito" className="block text-white hover:text-gray-400">Carrito</a>
        </div>
      )}
    </nav>
  );
};

export default Header;
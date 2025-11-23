import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Eliminé la línea de import Logo porque no la usábamos y daba warning
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateData = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      setUser(currentUser);
    };

    updateData();

    window.addEventListener('storage', updateData);
    return () => window.removeEventListener('storage', updateData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      timer: 1500,
      showConfirmButton: false,
      background: '#333',
      color: '#fff'
    });
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Ofertas', path: '/ofertas' },
    { name: 'Blog', path: '/blog' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header className="bg-neutral-900 text-white fixed w-full top-0 z-50 shadow-lg border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl tracking-wider">BlackMark<span className="text-orange-standard">Pet</span></span>
            </Link>
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-orange-standard px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-orange-standard font-bold px-3 py-2 border border-orange-standard rounded hover:bg-orange-standard hover:text-white transition">
                Panel Admin
              </Link>
            )}
          </nav>

          {/* Iconos Derecha */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/carrito" className="relative p-2 text-gray-300 hover:text-orange-standard transition-colors">
              <FaShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-300 hover:text-orange-standard focus:outline-none">
                  <FaUser className="h-5 w-5 mr-2" />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-300 hover:text-orange-standard font-medium text-sm">
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-orange-standard block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            {user && user.role === 'admin' && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-orange-standard font-bold block px-3 py-2 rounded-md text-base">
                Panel Admin
              </Link>
            )}
            <div className="border-t border-neutral-700 pt-4 mt-2">
               <Link to="/carrito" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-gray-300 hover:text-white">
                  <FaShoppingCart className="mr-3" /> Carrito ({cartCount})
               </Link>
               {user ? (
                 <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left flex items-center px-3 py-2 text-red-400 hover:text-red-300">
                    <FaUser className="mr-3" /> Cerrar Sesión
                 </button>
               ) : (
                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-gray-300 hover:text-white">
                    <FaUser className="mr-3" /> Iniciar Sesión
                 </Link>
               )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
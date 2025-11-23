import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminDashboard from '../components/organisms/AdminDashboard';
import GestionUsuariosAdmin from '../components/organisms/GestionUsuariosAdmin';
import GestionProductosAdmin from '../components/organisms/GestionProductosAdmin';
import { FaChartBar, FaBox, FaUsers } from 'react-icons/fa';

const PaginaAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/usuarios')) {
      setActiveTab('users');
    } else if (path.includes('/productos')) {
      setActiveTab('products');
    } else {
      setActiveTab('dashboard');
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/admin');
    if (tab === 'users') navigate('/admin/usuarios');
    if (tab === 'products') navigate('/admin/productos');
  };

  return (
    <div className="flex min-h-screen bg-neutral-900 pt-20">
      <aside className="w-64 bg-neutral-800 border-r border-neutral-700 hidden md:block fixed h-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white">Panel Admin</h2>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
              activeTab === 'dashboard' ? 'bg-orange-standard text-white' : 'text-gray-400 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            <FaChartBar className="mr-3" /> Dashboard
          </button>
          <button
            onClick={() => handleTabChange('products')}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
              activeTab === 'products' ? 'bg-orange-standard text-white' : 'text-gray-400 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            <FaBox className="mr-3" /> Productos
          </button>
          <button
            onClick={() => handleTabChange('users')}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
              activeTab === 'users' ? 'bg-orange-standard text-white' : 'text-gray-400 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            <FaUsers className="mr-3" /> Usuarios
          </button>
        </nav>
      </aside>

      <div className="md:hidden fixed bottom-0 w-full bg-neutral-800 flex justify-around p-4 z-40 border-t border-neutral-700">
          <button onClick={() => handleTabChange('dashboard')} className={activeTab === 'dashboard' ? 'text-orange-standard' : 'text-gray-400'}><FaChartBar /></button>
          <button onClick={() => handleTabChange('products')} className={activeTab === 'products' ? 'text-orange-standard' : 'text-gray-400'}><FaBox /></button>
          <button onClick={() => handleTabChange('users')} className={activeTab === 'users' ? 'text-orange-standard' : 'text-gray-400'}><FaUsers /></button>
      </div>

      <main className="flex-1 p-8 md:ml-64 overflow-y-auto">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'products' && <GestionProductosAdmin />}
        {activeTab === 'users' && <GestionUsuariosAdmin />}
      </main>
    </div>
  );
};

export default PaginaAdmin;
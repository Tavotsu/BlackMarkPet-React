// src/components/organisms/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    setUserCount(users.length);
    setProductCount(products.length);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-neutral-300">Usuarios Registrados</h3>
          <p className="text-4xl font-bold text-orange-standard mt-2">{userCount}</p>
        </div>
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-neutral-300">Productos Totales</h3>
          <p className="text-4xl font-bold text-orange-standard mt-2">{productCount}</p>
        </div>
        {/* Puedes agregar más tarjetas de estadísticas aquí */}
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    totalSales: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/dashboard');
        setStats(response.data || { users: 0, products: 0, orders: 0, totalSales: 0 });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-neutral-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Panel General</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-neutral-800 p-4 rounded-lg border-l-4 border-orange-standard">
          <h3 className="text-gray-400 text-sm">Ventas Totales</h3>
          <p className="text-3xl font-bold text-white mt-2">
            ${Number(stats.totalSales || 0).toLocaleString('es-CL')}
          </p>
        </div>

        <div className="bg-neutral-800 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-gray-400 text-sm">Usuarios Registrados</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.users || 0}</p>
        </div>

        <div className="bg-neutral-800 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="text-gray-400 text-sm">Productos Activos</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.products || 0}</p>
        </div>

        <div className="bg-neutral-800 p-4 rounded-lg border-l-4 border-purple-500">
          <h3 className="text-gray-400 text-sm">Pedidos Realizados</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.orders || 0}</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
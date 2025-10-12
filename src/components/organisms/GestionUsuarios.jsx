// src/components/organisms/GestionUsuarios.jsx
import React, { useState, useEffect } from 'react';

const GestionUsuarios = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleDeleteUser = (emailToDelete) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email === emailToDelete) {
      alert('No puedes eliminar al administrador actual.');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      const updatedUsers = users.filter(user => user.email !== emailToDelete);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert('Usuario eliminado.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Gestión de Usuarios ({users.length})</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.email} className="flex justify-between items-center bg-neutral-700 p-3 rounded-md">
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-neutral-400">{user.email}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user.email)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-1 px-3 rounded-md transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p className="text-neutral-400">No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
};

export default GestionUsuarios;
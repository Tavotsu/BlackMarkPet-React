import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const GestionUsuariosAdmin = () => {
    const [users, setUsers] = useState([]);
  
    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/users');
            setUsers(res.data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchUsers(); }, []);
  
    const handleDeleteUser = (id) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.id === id) return Swal.fire("Error", "No puedes eliminarte.", "error");
      
      Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3001/api/users/${id}`);
                Swal.fire("¡Eliminado!", "", "success");
                fetchUsers();
            } catch (error) { Swal.fire("Error", "No se pudo eliminar.", "error"); }
        }
      });
    };
  
    return (
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Gestión de Usuarios</h2>
        <div className="bg-neutral-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left text-neutral-300">
            <thead className="bg-neutral-700 text-sm uppercase"><tr><th className="p-4">Nombre</th><th className="p-4">Email</th><th className="p-4">Rol</th><th className="p-4">Acciones</th></tr></thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-neutral-700 hover:bg-neutral-600">
                  <td className="p-4 font-medium text-white">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-400 font-semibold">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};
  
export default GestionUsuariosAdmin;
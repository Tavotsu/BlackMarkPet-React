import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const GestionUsuariosAdmin = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar usuarios', error);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  // FUNCIÓN PARA AGREGAR USUARIO
  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Nuevo Usuario',
      background: '#333',
      color: '#fff',
      html:
        '<input id="swal-name" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-email" class="swal2-input" placeholder="Correo Electrónico">' +
        '<input id="swal-pass" class="swal2-input" type="password" placeholder="Contraseña">' +
        '<select id="swal-role" class="swal2-input">' +
          '<option value="cliente">Cliente</option>' +
          '<option value="admin">Admin</option>' +
        '</select>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-name').value,
          email: document.getElementById('swal-email').value,
          password: document.getElementById('swal-pass').value,
          role: document.getElementById('swal-role').value
        }
      }
    });

    if (formValues) {
      try {
        await axios.post('http://localhost:3001/api/users', formValues);
        Swal.fire({ icon: 'success', title: 'Usuario Creado', showConfirmButton: false, timer: 1500, background: '#333', color: '#fff' });
        loadUsers();
      } catch (error) {
        Swal.fire('Error', 'No se pudo crear el usuario', 'error');
      }
    }
  };

  const handleEdit = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Usuario',
      background: '#333',
      color: '#fff',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="${user.name}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Email" value="${user.email}">` +
        `<select id="swal-input3" class="swal2-input">
            <option value="cliente" ${user.role === 'cliente' ? 'selected' : ''}>Cliente</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
         </select>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => ({
          name: document.getElementById('swal-input1').value,
          email: document.getElementById('swal-input2').value,
          role: document.getElementById('swal-input3').value
      })
    });

    if (formValues) {
      try {
        await axios.put(`http://localhost:3001/api/users/${user.id}`, formValues);
        Swal.fire({ icon: 'success', title: 'Actualizado', showConfirmButton: false, timer: 1500, background: '#333', color: '#fff' });
        loadUsers();
      } catch (error) { Swal.fire('Error', 'No se pudo actualizar', 'error'); }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
        title: '¿Eliminar?', text: "No podrás revertir esto", icon: 'warning', showCancelButton: true,
        confirmButtonColor: '#d33', confirmButtonText: 'Sí, eliminar', background: '#333', color: '#fff'
    });
    if (result.isConfirmed) {
        try {
            await axios.delete(`http://localhost:3001/api/users/${id}`);
            loadUsers();
            Swal.fire({ icon: 'success', title: 'Eliminado', showConfirmButton: false, timer: 1500, background: '#333', color: '#fff' });
        } catch (e) { Swal.fire('Error', 'Falló la eliminación', 'error'); }
    }
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gestión de Usuarios</h2>
        <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold transition">
          + Agregar Usuario
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-neutral-300">
          <thead className="bg-neutral-800 text-orange-standard uppercase text-sm">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rol</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-800 transition">
                <td className="p-3">{user.id}</td>
                <td className="p-3 font-medium text-white">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-purple-900 text-purple-200' : 'bg-gray-700 text-gray-300'}`}>
                        {user.role || 'cliente'}
                    </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button onClick={() => handleEdit(user)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">Editar</button>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Borrar</button>
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
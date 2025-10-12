// src/components/organisms/GestionUsuariosAdmin.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const GestionUsuariosAdmin = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
  
    useEffect(() => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(storedUsers);
    }, []);

    // --- MODIFICADO ---
    const validatePassword = (password) => {
        // Regex actualizada para ser más flexible con los símbolos
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
        return regex.test(password);
    };

    const validateEmail = (email) => {
        const allowedDomains = ['duocuc.cl', 'profesor.duoc.cl'];
        const domain = email.split('@')[1];
        return allowedDomains.includes(domain);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleCreateUser = (e) => {
        e.preventDefault();
        setError('');

        if (newUser.name.length < 4) {
            setError('El nombre debe tener al menos 4 caracteres.'); return;
        }
        if (!validateEmail(newUser.email)) {
            setError('El correo debe pertenecer a @duocuc.cl o @profesor.duoc.cl.'); return;
        }
        // --- MODIFICADO ---
        if (!validatePassword(newUser.password)) {
            setError('La contraseña debe tener al menos 8 caracteres, e incluir al menos una letra, un número y un símbolo (ej: @, $, !, *, ?, &).'); return;
        }
        if (users.find(user => user.email === newUser.email)) {
            setError('Este correo electrónico ya está registrado.'); return;
        }

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        Swal.fire({
            title: "¡Éxito!",
            text: "Usuario creado correctamente.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });

        setIsModalOpen(false);
        setNewUser({ name: '', email: '', password: '' });
    };
  
    const handleDeleteUser = (emailToDelete) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.email === emailToDelete) {
        Swal.fire("Error", "No puedes eliminarte a ti mismo.", "error");
        return;
      }
      
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este usuario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedUsers = users.filter(user => user.email !== emailToDelete);
          setUsers(updatedUsers);
          localStorage.setItem('users', JSON.stringify(updatedUsers));
          Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
        }
      });
    };
  
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Gestión de Usuarios</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Añadir Usuario
          </button>
        </div>
        <div className="bg-neutral-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left text-neutral-300">
            <thead className="bg-neutral-700 text-sm uppercase">
              <tr><th className="p-4">Nombre</th><th className="p-4">Correo Electrónico</th><th className="p-4">Acciones</th></tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email} className="border-b border-neutral-700 hover:bg-neutral-600">
                  <td className="p-4 font-medium text-white">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 font-semibold">Editar</button>
                    <button onClick={() => handleDeleteUser(user.email)} className="text-red-500 hover:text-red-400 font-semibold">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center py-8 text-neutral-400">No hay usuarios registrados.</p>}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
              <h3 className="text-2xl font-bold text-white mb-6">Crear Nuevo Usuario</h3>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <input type="text" name="name" placeholder="Nombre completo" value={newUser.name} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" required />
                <input type="email" name="email" placeholder="Correo electrónico" value={newUser.email} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" required />
                <input type="password" name="password" placeholder="Contraseña" value={newUser.password} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" required />
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div className="flex justify-end space-x-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="py-2 px-5 bg-neutral-600 hover:bg-neutral-500 text-white font-semibold rounded-md">Cancelar</button>
                  <button type="submit" className="py-2 px-5 bg-orange-standard hover:bg-orange-dark text-white font-bold rounded-md">Crear Usuario</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default GestionUsuariosAdmin;
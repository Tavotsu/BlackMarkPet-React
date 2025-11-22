import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const GestionProductosAdmin = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: 'Alimentos' });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/productos');
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleInputChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/productos', { ...newProduct, price: Number(newProduct.price) });
      Swal.fire("¡Éxito!", "Producto añadido.", "success");
      setIsModalOpen(false);
      setNewProduct({ name: '', price: '', image: '', category: 'Alimentos' });
      fetchProducts();
    } catch (error) {
      Swal.fire("Error", "No se pudo crear.", "error");
    }
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/api/productos/${id}`);
          Swal.fire("¡Eliminado!", "", "success");
          fetchProducts();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar.", "error");
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Gestión de Productos</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Añadir Producto</button>
      </div>
      <div className="bg-neutral-800 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left text-neutral-300">
          <thead className="bg-neutral-700 text-sm uppercase"><tr><th className="p-4">Imagen</th><th className="p-4">Nombre</th><th className="p-4">Precio</th><th className="p-4">Acciones</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-neutral-700 hover:bg-neutral-600">
                <td className="p-4"><img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-md" /></td>
                <td className="p-4 text-white">{p.name}</td>
                <td className="p-4">${p.price.toLocaleString('es-CL')}</td>
                <td className="p-4 space-x-2">
                  <Link to={`/admin/productos/editar/${p.id}`} className="text-blue-400 hover:text-blue-300 font-semibold">Editar</Link>
                  <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-red-400 font-semibold">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-neutral-800 p-8 rounded-lg w-full max-w-md">
              <h3 className="text-2xl font-bold text-white mb-6">Nuevo Producto</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input type="text" name="name" placeholder="Nombre" value={newProduct.name} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white" required />
                <input type="number" name="price" placeholder="Precio" value={newProduct.price} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white" required />
                <input type="text" name="image" placeholder="URL Imagen" value={newProduct.image} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white" required />
                <select name="category" value={newProduct.category} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white">
                  <option value="Alimentos">Alimentos</option>
                  <option value="Juguetes">Juguetes</option>
                  <option value="Higiene">Higiene</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
                <div className="flex justify-end space-x-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="py-2 px-5 bg-neutral-600 text-white rounded-md">Cancelar</button>
                  <button type="submit" className="py-2 px-5 bg-orange-standard text-white font-bold rounded-md">Guardar</button>
                </div>
              </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default GestionProductosAdmin; 
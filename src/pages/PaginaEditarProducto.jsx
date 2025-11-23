import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const PaginaEditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', image: '', category: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/productos/${id}`);
        setProduct(response.data);
      } catch (error) {
        Swal.fire('Error', 'Producto no encontrado.', 'error');
        navigate('/admin/productos');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/productos/${id}`, product);
      Swal.fire({
          title: '¡Actualizado!',
          text: 'El producto se guardó correctamente.',
          icon: 'success',
          confirmButtonColor: '#f97316'
      });
      navigate('/admin/productos');
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar los cambios.', 'error');
    }
  };

  return (
    <div className="bg-neutral-900 text-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-neutral-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-orange-standard">Editar Producto #{id}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Nombre</label>
            <input type="text" name="name" value={product.name} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-standard" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Precio</label>
                <input type="number" name="price" value={product.price} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-standard" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Categoría</label>
                <select name="category" value={product.category} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-standard">
                    <option value="Alimentos">Alimentos</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Salud">Salud</option>
                </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">URL Imagen</label>
            <input type="text" name="image" value={product.image} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-standard" required />
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Link to="/admin/productos" className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded font-bold transition-colors">Cancelar</Link>
            <button type="submit" className="px-6 py-2 bg-orange-standard hover:bg-orange-dark rounded font-bold transition-colors">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaginaEditarProducto;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const PaginaEditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', image: '', category: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/productos/${id}`);
            setProduct(res.data);
            setLoading(false);
        } catch (error) {
            Swal.fire('Error', 'Producto no encontrado.', 'error');
            navigate('/admin/productos');
        }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleInputChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:3001/api/productos/${id}`, { ...product, price: Number(product.price) });
        Swal.fire('¡Guardado!', 'Producto actualizado.', 'success');
        navigate('/admin/productos');
    } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  if (loading) return <p className="text-white text-center">Cargando...</p>;

  return (
    <div className="bg-neutral-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
        <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="name" value={product.name} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white" required />
            <input type="number" name="price" value={product.price} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white" required />
            <input type="text" name="image" value={product.image} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white" required />
            <select name="category" value={product.category} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white">
                <option value="Alimentos">Alimentos</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Higiene">Higiene</option>
                <option value="Accesorios">Accesorios</option>
            </select>
            <div className="flex justify-end space-x-4 pt-4">
              <Link to="/admin/productos" className="py-2 px-5 bg-neutral-600 rounded-md">Cancelar</Link>
              <button type="submit" className="py-2 px-5 bg-orange-standard font-bold rounded-md">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaginaEditarProducto;
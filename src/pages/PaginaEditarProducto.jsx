import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaginaEditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productToEdit = products.find(p => p.id === parseInt(id));

    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      Swal.fire('Error', 'Producto no encontrado.', 'error');
      navigate('/admin/productos');
    }
    setLoading(false);
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.image) {
      Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.map(p =>
      p.id === parseInt(id) ? { ...product, price: Number(product.price) } : p
    );

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    Swal.fire('¡Guardado!', 'El producto ha sido actualizado.', 'success');
    navigate('/admin/productos');
  };

  if (loading) {
    return <p className="text-white text-center">Cargando...</p>;
  }

  return (
    <div className="bg-neutral-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
        <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Nombre del Producto</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-standard"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-neutral-300 mb-1">Precio</label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-standard"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-neutral-300 mb-1">URL de la Imagen</label>
              <input
                type="text"
                id="image"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-standard"
                required
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Link to="/admin/productos" className="py-2 px-5 bg-neutral-600 hover:bg-neutral-500 text-white font-semibold rounded-md">
                Cancelar
              </Link>
              <button type="submit" className="py-2 px-5 bg-orange-standard hover:bg-orange-dark text-white font-bold rounded-md">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaginaEditarProducto;
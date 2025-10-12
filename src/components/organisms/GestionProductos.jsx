// src/components/organisms/GestionProductos.jsx
import React, { useState, useEffect } from 'react';

const GestionProductos = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const productToAdd = { ...newProduct, id: Date.now(), price: Number(newProduct.price) };
    const updatedProducts = [...products, productToAdd];
    
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    setNewProduct({ name: '', price: '', image: '' });
    alert('Producto añadido con éxito.');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      alert('Producto eliminado.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Gestión de Productos ({products.length})</h2>
      
      <form onSubmit={handleAddProduct} className="mb-6 p-4 bg-neutral-700 rounded-lg space-y-3">
        <h3 className="text-lg font-semibold text-white">Añadir Nuevo Producto</h3>
        <input name="name" type="text" placeholder="Nombre del producto" value={newProduct.name} onChange={handleInputChange} className="w-full p-2 bg-neutral-600 rounded-md text-white placeholder-neutral-400" />
        <input name="price" type="number" placeholder="Precio" value={newProduct.price} onChange={handleInputChange} className="w-full p-2 bg-neutral-600 rounded-md text-white placeholder-neutral-400" />
        <input name="image" type="text" placeholder="URL de la imagen" value={newProduct.image} onChange={handleInputChange} className="w-full p-2 bg-neutral-600 rounded-md text-white placeholder-neutral-400" />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md transition-colors">Añadir Producto</button>
      </form>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="flex justify-between items-center bg-neutral-700 p-3 rounded-md">
              <div className="flex items-center space-x-4">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                <div>
                  <p className="font-semibold text-white">{product.name}</p>
                  <p className="text-sm text-neutral-400">${product.price.toLocaleString('es-CL')}</p>
                </div>
              </div>
              <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-1 px-3 rounded-md transition-colors">
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p className="text-neutral-400 text-center">No hay productos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default GestionProductos;
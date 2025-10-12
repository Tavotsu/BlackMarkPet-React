// src/components/organisms/GestionProductosAdmin.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { defaultProducts } from '../../data/defaultProducts'; // <-- 1. Importar los productos

const GestionProductosAdmin = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  useEffect(() => {
    // <-- 2. Lógica actualizada
    let storedProducts = JSON.parse(localStorage.getItem('products'));

    if (!storedProducts || storedProducts.length === 0) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      storedProducts = defaultProducts;
    }

    setProducts(storedProducts);
  }, []);

  // ... (El resto del componente, como handleAddProduct y handleDeleteProduct, no cambia)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      Swal.fire("Error", "Por favor, completa todos los campos.", "error");
      return;
    }
    
    const productToAdd = { ...newProduct, id: Date.now(), price: Number(newProduct.price) };
    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    Swal.fire("¡Éxito!", "Producto añadido correctamente.", "success");
    setIsModalOpen(false);
    setNewProduct({ name: '', price: '', image: '' });
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este producto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
      }
    });
  };

  return (
    // ... (El JSX del componente no cambia)
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Gestión de Productos</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Añadir Producto
        </button>
      </div>
      <div className="bg-neutral-800 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left text-neutral-300">
          <thead className="bg-neutral-700 text-sm uppercase">
            <tr>
              <th className="p-4">Imagen</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-neutral-700 hover:bg-neutral-600">
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="p-4 font-medium text-white">{product.name}</td>
                <td className="p-4">${product.price.toLocaleString('es-CL')}</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 font-semibold">Editar</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-400 font-semibold">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center py-8 text-neutral-400">No hay productos para mostrar.</p>}
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
              <h3 className="text-2xl font-bold text-white mb-6">Añadir Nuevo Producto</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input type="text" name="name" placeholder="Nombre del producto" value={newProduct.name} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" required />
                <input type="number" name="price" placeholder="Precio" value={newProduct.price} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" required />
                <input type="text" name="image" placeholder="URL de la imagen" value={newProduct.image} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" required />
                <div className="flex justify-end space-x-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="py-2 px-5 bg-neutral-600 hover:bg-neutral-500 text-white font-semibold rounded-md">Cancelar</button>
                  <button type="submit" className="py-2 px-5 bg-orange-standard hover:bg-orange-dark text-white font-bold rounded-md">Añadir Producto</button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default GestionProductosAdmin;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const GestionProductosAdmin = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await axios.get('https://backend-bmp-express-production.up.railway.app/api/productos');
      const data = response.data;
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error al cargar productos', error);
      setProducts([]);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Nuevo Producto',
      background: '#333',
      color: '#fff',
      html:
        '<input id="swal-name" class="swal2-input" placeholder="Nombre del Producto">' +
        '<input id="swal-price" class="swal2-input" type="number" placeholder="Precio">' +
        '<input id="swal-image" class="swal2-input" placeholder="URL de Imagen">' +
        '<select id="swal-cat" class="swal2-input">' +
          '<option value="Alimentos">Alimentos</option>' +
          '<option value="Juguetes">Juguetes</option>' +
          '<option value="Accesorios">Accesorios</option>' +
          '<option value="Salud">Salud</option>' +
        '</select>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-name').value,
          price: document.getElementById('swal-price').value,
          image: document.getElementById('swal-image').value,
          category: document.getElementById('swal-cat').value
        }
      }
    });

    if (formValues) {
      try {
        await axios.post('https://backend-bmp-express-production.up.railway.app/api/productos', formValues);
        Swal.fire({ icon: 'success', title: 'Producto Creado', showConfirmButton: false, timer: 1500, background: '#333', color: '#fff' });
        loadProducts();
      } catch (error) {
        Swal.fire('Error', 'No se pudo crear el producto', 'error');
      }
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: '¿Eliminar?', text: `Se borrará "${name}"`, icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Sí, borrar',
      background: '#333', color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://backend-bmp-express-production.up.railway.app/api/productos/${id}`);
        loadProducts();
        Swal.fire({ icon: 'success', title: 'Eliminado', showConfirmButton: false, timer: 1500, background: '#333', color: '#fff' });
      } catch (error) { Swal.fire('Error', 'Fallo al eliminar', 'error'); }
    }
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Inventario de Productos</h2>
        <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold transition">
          + Agregar Producto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-neutral-300">
          <thead className="bg-neutral-800 text-orange-standard uppercase text-sm">
            <tr>
              <th className="p-3">Imagen</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Precio</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-800 transition">
                <td className="p-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="p-3 font-medium text-white">{product.name}</td>
                <td className="p-3 text-sm">{product.category}</td>
                <td className="p-3 text-green-400 font-bold">${Number(product.price).toLocaleString('es-CL')}</td>
                <td className="p-3 text-center space-x-2">
                  <Link to={`/admin/editar-producto/${product.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(product.id, product.name)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition">
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionProductosAdmin;
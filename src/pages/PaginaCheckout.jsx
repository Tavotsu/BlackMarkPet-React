import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaginaCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    address: '',
    apartment: '',
    region: 'Los Lagos',
    commune: 'Puerto Montt',
    indications: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(cartTotal);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const [name = '', lastName = ''] = currentUser.name.split(' ');
      setFormData(prev => ({ ...prev, name, lastName, email: currentUser.email }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isSuccess = Math.random() > 0.2; 

    if (isSuccess) {
      Swal.fire({
        title: "Procesando Pago...",
        text: "Por favor, espera.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      setTimeout(() => {
        const orderDetails = {
          items: cartItems,
          total: total,
          customer: formData,
          orderId: `order_${Date.now()}`
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        localStorage.removeItem('cart'); 
        window.dispatchEvent(new Event('storage')); 
        navigate('/pago-exitoso');
        Swal.close();
      }, 2000);

    } else {
      Swal.fire({
        title: "Error en el Pago",
        text: "No se pudo procesar el pago. Por favor, intenta de nuevo.",
        icon: "error",
      });
      navigate('/pago-fallido');
    }
  };

  return (
    <div className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>
        <form onSubmit={handleSubmit}>
          <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6">Resumen del Carrito</h2>
            <div className="space-y-4 mb-8">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-neutral-300">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4"/>
                    <span>{item.name} x{item.quantity}</span>
                  </div>
                  <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                </div>
              ))}
            </div>
            <div className="text-right text-2xl font-bold mb-8">
              Total a pagar: <span className="text-orange-standard">${total.toLocaleString('es-CL')}</span>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-6">Información del Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" required />
              <input type="text" name="lastName" placeholder="Apellidos" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" required />
              <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 md:col-span-2" required />
            </div>

            <h2 className="text-xl font-bold mt-8 mb-6">Dirección de Entrega</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="address" placeholder="Calle y número" onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 md:col-span-2" required />
              <input type="text" name="apartment" placeholder="Departamento (opcional)" onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400" />
              <select name="region" value={formData.region} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white">
                <option>Los Lagos</option>
              </select>
              <select name="commune" value={formData.commune} onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white">
                <option>Puerto Montt</option>
                <option>Puerto Varas</option>
                <option>Alerce</option>
              </select>
              <textarea name="indications" placeholder="Indicaciones para la entrega (opcional)" onChange={handleInputChange} className="w-full p-3 bg-neutral-700 rounded-md text-white placeholder-neutral-400 md:col-span-2" rows="3"></textarea>
            </div>
            
            <div className="flex justify-end mt-8">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md transition-colors">
                Pagar ahora ${total.toLocaleString('es-CL')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaginaCheckout;
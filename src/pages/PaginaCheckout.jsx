import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const PaginaCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    address: '', apartment: '', region: 'Los Lagos', commune: 'Puerto Montt', indications: ''
  });
  const navigate = useNavigate();

 
  const [webpayData, setWebpayData] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(cartTotal);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: "Conectando con Webpay...",
      text: "Por favor espera",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      
      const response = await axios.post('https://backend-bmp-express-production.up.railway.app/api/payment/init', {
        userId: user.id,
        total: total,
        items: cartItems.map(item => ({
          id: item.id, quantity: item.quantity, price: item.price
        }))
      });

      const { token, url } = response.data;
      console.log("Token recibido:", token); 

     
      Swal.close();

      
      setWebpayData({ token, url });

      const form = document.createElement('form');
      form.action = url;
      form.method = 'POST';
      
      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'token_ws';
      tokenInput.value = token;
      
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error("Error pago:", error);
      Swal.fire({ title: "Error", text: "No se pudo iniciar el pago.", icon: "error" });
    }
  };

  if (!user) return null;

  return (
    <div className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>
        
        {/* Si tenemos datos de Webpay pero no redirigió, mostramos este botón manual */}
        {webpayData ? (
          <div className="bg-neutral-800 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-white mb-4">¡Todo listo!</h2>
            <p className="text-gray-400 mb-6">Si no fuiste redirigido automáticamente, haz click abajo:</p>
            <form action={webpayData.url} method="POST">
              <input type="hidden" name="token_ws" value={webpayData.token} />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors">
                Ir a Webpay Ahora
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-6">Resumen de Compra</h2>
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-neutral-300 border-b border-neutral-700 pb-2">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
              <div className="text-right text-2xl font-bold mb-8 text-orange-standard">
                Total: ${total.toLocaleString('es-CL')}
              </div>

              <h2 className="text-xl font-bold mb-4">Datos de Envío</h2>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <p className="text-gray-400">Cliente: {user.name}</p>
                <input type="text" name="address" placeholder="Dirección" onChange={handleInputChange} className="p-3 bg-neutral-700 rounded text-white" required />
                <div className="grid grid-cols-2 gap-4">
                   <select name="commune" className="p-3 bg-neutral-700 rounded text-white">
                      <option>Puerto Montt</option>
                      <option>Puerto Varas</option>
                   </select>
                   <input type="text" name="apartment" placeholder="Depto (Opcional)" onChange={handleInputChange} className="p-3 bg-neutral-700 rounded text-white" />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-orange-standard hover:bg-orange-dark text-white font-bold py-4 rounded-md transition-colors text-lg">
                Pagar con Webpay
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaginaCheckout;
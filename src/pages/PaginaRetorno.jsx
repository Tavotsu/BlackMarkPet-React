import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaginaRetorno = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); 
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token_ws');

    if (!token) {
      setStatus('rejected');
      return;
    }

    const confirmPayment = async () => {
      try {
        const response = await axios.post('https://backend-bmp-express-production.up.railway.app/api/payment/commit', {
          token_ws: token
        });

        if (response.data.status === 'AUTHORIZED') {
          setStatus('success');
          setDetails(response.data.detail);
          localStorage.removeItem('cart'); 
          window.dispatchEvent(new Event('storage'));
        } else {
          setStatus('rejected');
        }
      } catch (error) {
        setStatus('rejected');
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        
        {status === 'loading' && (
          <div>
            <h2 className="text-2xl text-white font-bold mb-2">Verificando pago...</h2>
            <p className="text-gray-400">Espera un momento.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <h2 className="text-3xl text-green-500 font-bold mb-4">¡Pago Exitoso!</h2>
            <p className="text-gray-300 mb-6">Tu compra fue aprobada correctamente.</p>
            
            {details && (
              <div className="bg-neutral-700 p-4 rounded text-left text-sm text-gray-300 mb-6">
                <p><strong>Orden:</strong> {details.buy_order}</p>
                <p><strong>Monto:</strong> ${details.amount.toLocaleString('es-CL')}</p>
                <p><strong>Tarjeta:</strong> **** {details.card_detail.card_number}</p>
                <p><strong>Fecha:</strong> {new Date(details.transaction_date).toLocaleDateString()}</p>
              </div>
            )}

            <button onClick={() => navigate('/catalogo')} className="w-full bg-orange-standard hover:bg-orange-dark text-white py-3 rounded font-bold transition">
              Volver a la tienda
            </button>
          </div>
        )}

        {status === 'rejected' && (
          <div>
            <h2 className="text-3xl text-red-500 font-bold mb-4">Pago Rechazado</h2>
            <p className="text-gray-300 mb-6">La transacción fue anulada o rechazada por el banco.</p>
            <button onClick={() => navigate('/checkout')} className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded font-bold transition">
              Intentar de nuevo
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaginaRetorno;
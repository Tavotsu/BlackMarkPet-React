import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PaginaPagoExitoso = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
        if (lastOrder) {
            setOrder(lastOrder);
        }
    }, []);

    if (!order) return <p className="text-white text-center">Cargando...</p>;

    return (
        <div className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-neutral-800 p-8 rounded-lg shadow-lg text-center">
                <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h1 className="text-3xl font-bold mb-2">¡Compra Realizada con Éxito!</h1>
                <p className="text-neutral-400 mb-6">Tu pedido <span className="font-bold text-orange-standard">#{order.orderId.split('_')[1]}</span> está siendo preparado.</p>

                <div className="text-left border-t border-neutral-700 pt-6 mt-6">
                    <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                    {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center mb-2">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-xl mt-4 border-t border-neutral-600 pt-2">
                        <span>Total Pagado:</span>
                        <span className="text-orange-standard">${order.total.toLocaleString('es-CL')}</span>
                    </div>
                </div>

                <div className="text-left border-t border-neutral-700 pt-6 mt-6">
                    <h2 className="text-xl font-bold mb-4">Información de Envío</h2>
                    <p>{order.customer.name} {order.customer.lastName}</p>
                    <p>{order.customer.address}, {order.customer.apartment}</p>
                    <p>{order.customer.commune}, {order.customer.region}</p>
                </div>
                
                <Link to="/catalogo" className="mt-8 inline-block bg-orange-standard hover:bg-orange-dark text-white font-bold py-3 px-6 rounded-md transition-colors">
                    Seguir Comprando
                </Link>
            </div>
        </div>
    );
};

export default PaginaPagoExitoso;
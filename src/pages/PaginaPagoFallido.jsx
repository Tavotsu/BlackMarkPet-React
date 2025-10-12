import React from 'react';
import { Link } from 'react-router-dom';

const PaginaPagoFallido = () => {
    return (
        <div className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-neutral-800 p-8 rounded-lg shadow-lg text-center">
                <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h1 className="text-3xl font-bold mb-2">No se Pudo Realizar el Pago</h1>
                <p className="text-neutral-400 mb-8">Hubo un problema al procesar tu pago. Por favor, verifica tus datos e inténtalo de nuevo.</p>
                
                <Link to="/checkout" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
                    Volver a Intentar el Pago
                </Link>
            </div>
        </div>
    );
};

export default PaginaPagoFallido;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import PaginaPrincipal from './pages/PaginaPrincipal';
import PaginaLogin from './pages/PaginaLogin';
import PaginaRegistro from './pages/PaginaRegistro';
import PaginaCatalogo from './pages/PaginaCatalogo';
import PaginaDetalleBlog from './pages/PaginaDetalleBlog';
import PaginaBlog from './pages/PaginaBlog';
import PaginaContacto from './pages/PaginaContacto';
import PaginaNosotros from './pages/PaginaNosotros';
import PaginaCarrito from './pages/PaginaCarrito';
import PaginaCheckout from './pages/PaginaCheckout';
import PaginaPagoExitoso from './pages/PaginaPagoExitoso';
import PaginaPagoFallido from './pages/PaginaPagoFallido';
import PaginaAdmin from './pages/PaginaAdmin';
import PaginaOfertas from './pages/PaginaOfertas';
import PaginaEditarProducto from './pages/PaginaEditarProducto';
import PaginaRetorno from './pages/PaginaRetorno';
import RutaAdmin from './components/RutaAdmin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-neutral-900">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/login" element={<PaginaLogin />} />
            <Route path="/registro" element={<PaginaRegistro />} />
            <Route path="/catalogo" element={<PaginaCatalogo />} />
            <Route path="/ofertas" element={<PaginaOfertas />} />
            <Route path="/blog" element={<PaginaBlog />} />
            <Route path="/blog/:id" element={<PaginaDetalleBlog />} />
            <Route path="/contacto" element={<PaginaContacto />} />
            <Route path="/nosotros" element={<PaginaNosotros />} />
            <Route path="/carrito" element={<PaginaCarrito />} />
            <Route path="/checkout" element={<PaginaCheckout />} />
            <Route path="/pago-exitoso" element={<PaginaPagoExitoso />} />
            <Route path="/pago-fallido" element={<PaginaPagoFallido />} />
            
            <Route path="/pago-finalizado" element={<PaginaRetorno />} />

            <Route path="/admin" element={<RutaAdmin><PaginaAdmin /></RutaAdmin>} />
            <Route path="/admin/productos" element={<RutaAdmin><PaginaAdmin /></RutaAdmin>} />
            <Route path="/admin/usuarios" element={<RutaAdmin><PaginaAdmin /></RutaAdmin>} />
            <Route path="/admin/editar-producto/:id" element={<RutaAdmin><PaginaEditarProducto /></RutaAdmin>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
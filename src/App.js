import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';

// Páginas Públicas
import HomePage from './pages/PaginaPrincipal';
import CatalogPage from './pages/PaginaCatalogo';
import PaginaOfertas from './pages/PaginaOfertas';
import BlogsPage from './pages/PaginaBlog';
import PaginaDetalleBlog from './pages/PaginaDetalleBlog';
import AboutPage from './pages/PaginaNosotros';
import ContactPage from './pages/PaginaContacto';
import PaginaRegistro from './pages/PaginaRegistro';
import PaginaLogin from './pages/PaginaLogin';
import PaginaCarrito from './pages/PaginaCarrito';
import PaginaCheckout from './pages/PaginaCheckout';
import PaginaPagoExitoso from './pages/PaginaPagoExitoso';
import PaginaPagoFallido from './pages/PaginaPagoFallido';

// Admin
import PaginaAdmin from './pages/PaginaAdmin';
import RutaAdmin from './components/RutaAdmin';
import AdminDashboard from './components/organisms/AdminDashboard';
import GestionProductosAdmin from './components/organisms/GestionProductosAdmin';
import GestionUsuariosAdmin from './components/organisms/GestionUsuariosAdmin';
import PaginaEditarProducto from './pages/PaginaEditarProducto';

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/ofertas" element={<PaginaOfertas />} /> 
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<PaginaDetalleBlog />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/registro" element={<PaginaRegistro />} />
          <Route path="/carrito" element={<PaginaCarrito />} />
          <Route path="/carrito" element={<PaginaCarrito />} />
          <Route path="/checkout" element={<PaginaCheckout />} /> 
          <Route path="/pago-exitoso" element={<PaginaPagoExitoso />} />
          <Route path="/pago-fallido" element={<PaginaPagoFallido />} />
  
          
          <Route element={<RutaAdmin />}>
            <Route path="/admin" element={<PaginaAdmin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="productos" element={<GestionProductosAdmin />} />
              <Route path="productos/editar/:id" element={<PaginaEditarProducto />} /> 
              <Route path="usuarios" element={<GestionUsuariosAdmin />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
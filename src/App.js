// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import HomePage from './pages/PaginaPrincipal';
import CatalogPage from './pages/PaginaCatalogo';
import BlogsPage from './pages/PaginaBlog';
import AboutPage from './pages/PaginaNosotros';
import ContactPage from './pages/PaginaContacto';


function App() {
  return (
    <BrowserRouter>
      <div className="bg-neutral-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            {/* Aquí agregarías más rutas como /carrito, /login, etc. */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
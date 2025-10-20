import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import Footer from '../components/organisms/Footer';
import Logo from '../components/molecules/Logo';
import Button from '../components/atoms/Button';
import FormField from '../components/atoms/FormField';
import CatalogProductCard from '../components/molecules/CatalogProductCard';
import PaginaLogin from '../pages/PaginaLogin';
import FilterSidebar from '../components/organisms/FilterSidebar';
import Header from '../components/organisms/Header';
import PaginaRegistro from '../pages/PaginaRegistro';

describe('Pruebas para los Componentes de BlackMarkPet', () => {
  let contenedor;
  let root;

  describe('Componente: Footer', () => {
    beforeEach(() => {
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      act(() => {
        root.render(<Footer />);
      });
    });

    afterEach(() => {
      act(() => {
        root.unmount();
      });
      document.body.removeChild(contenedor);
      contenedor = null;
    });

    it('debería mostrar el texto de derechos reservados', () => {
      expect(contenedor.textContent).toContain('© 2025 BlackMarkpet. Todos los derechos reservados.');
    });

    it('debería mostrar los nombres de los desarrolladores', () => {
      expect(contenedor.textContent).toContain('Desarrollado por Gustavo Santana y Cristobal Valdebenito');
    });
  });

  describe('Componente: Logo', () => {
    beforeEach(() => {
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      act(() => {
        root.render(
          <BrowserRouter>
            <Logo />
          </BrowserRouter>
        );
      });
    });

    afterEach(() => {
      act(() => {
        root.unmount();
      });
      document.body.removeChild(contenedor);
      contenedor = null;
    });

    it('debería renderizar el nombre de la marca "BlackMarkpet"', () => {
      expect(contenedor.textContent).toContain('BlackMarkpet');
    });
  });

  describe('Componente: Button', () => {
    let miFuncionClick;

    beforeEach(() => {
      miFuncionClick = jasmine.createSpy('onClick');
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      act(() => {
        root.render(<Button onClick={miFuncionClick}>Mi Botón</Button>);
      });
    });

    afterEach(() => {
      act(() => {
        root.unmount();
      });
      document.body.removeChild(contenedor);
      contenedor = null;
    });

    it('debería llamar a la función onClick al ser presionado', () => {
      const boton = contenedor.querySelector('button');
      act(() => {
        boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(miFuncionClick).toHaveBeenCalled();
    });

    it('debería mostrar el texto que se le pasa como hijo (children)', () => {
      expect(contenedor.textContent).toBe('Mi Botón');
    });
  });

  describe('Componente: FormField', () => {
    beforeEach(() => {
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
    });

    afterEach(() => {
      act(() => {
        root.unmount();
      });
      document.body.removeChild(contenedor);
      contenedor = null;
    });

    it('debería renderizar un <input> por defecto', () => {
      act(() => {
        root.render(<FormField />);
      });
      expect(contenedor.querySelector('input')).not.toBeNull();
      expect(contenedor.querySelector('textarea')).toBeNull();
    });

    it('debería renderizar un <textarea> si la prop "isTextArea" es verdadera', () => {
      act(() => {
        root.render(<FormField isTextArea={true} />);
      });
      expect(contenedor.querySelector('textarea')).not.toBeNull();
      expect(contenedor.querySelector('input')).toBeNull();
    });
  });

  describe('Componente: CatalogProductCard', () => {
    const productoDePrueba = {
      id: 100,
      name: 'Producto de Prueba',
      price: 5000,
      image: 'test.jpg'
    };

    beforeEach(() => {
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      act(() => {
        root.render(<CatalogProductCard product={productoDePrueba} />);
      });
      localStorage.clear();
      spyOn(localStorage, 'setItem');
      spyOn(Swal, 'fire');
    });
    
    afterEach(() => {
      act(() => {
        root.unmount();
      });
      document.body.removeChild(contenedor);
      contenedor = null;
    });

    it('debería renderizar el nombre y el precio del producto', () => {
      expect(contenedor.textContent).toContain(productoDePrueba.name);
      expect(contenedor.textContent).toContain(productoDePrueba.price.toLocaleString('es-CL'));
    });

    it('debería llamar a localStorage.setItem y Swal.fire al añadir un producto al carrito', () => {
      const boton = contenedor.querySelector('button');
      act(() => {
        boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalled();
    });
  });

  describe('Componente: PaginaLogin', () => {
    beforeEach(() => {
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      act(() => {
        root.render(
            <BrowserRouter>
                <PaginaLogin />
            </BrowserRouter>
        );
      });
    });

    afterEach(() => {
      act(() => {
        root.unmount();
      });
      document.body.removeChild(contenedor);
      contenedor = null;
    });

    it('debería renderizar un título, un campo para email y otro para contraseña', () => {
      expect(contenedor.textContent).toContain('Iniciar Sesión');
      expect(contenedor.querySelector('input[type="email"]')).not.toBeNull();
      expect(contenedor.querySelector('input[type="password"]')).not.toBeNull();
    });
    
    it('debería actualizar el valor del campo email al escribir', () => {
        const emailInput = contenedor.querySelector('input[type="email"]');
        act(() => {
          emailInput.value = 'test@duocuc.cl';
          emailInput.dispatchEvent(new Event('change', { bubbles: true }));
        });
        expect(emailInput.value).toBe('test@duocuc.cl');
    });

    it('debería actualizar el valor del campo contraseña al escribir', () => {
        const passwordInput = contenedor.querySelector('input[type="password"]');
        act(() => {
          passwordInput.value = 'password123';
          passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
        });
        expect(passwordInput.value).toBe('password123');
    });
  });
  
  describe('Componente: FilterSidebar', () => {
    let funcionSeleccionarCategoria;
    const categorias = ['Todos', 'Alimentos', 'Juguetes'];

    beforeEach(() => {
      funcionSeleccionarCategoria = jasmine.createSpy('onSelectCategory');
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      act(() => {
        root.render(<FilterSidebar onSelectCategory={funcionSeleccionarCategoria} selectedCategory="Todos" />);
      });
    });

    afterEach(() => {
      act(() => {
        root.unmount();
      });
      document.body.removeChild(contenedor);
      contenedor = null;
    });

    it('debería renderizar la lista de categorías', () => {
      const botones = contenedor.querySelectorAll('button');
      expect(botones.length).toBe(categorias.length + 2);
      expect(contenedor.textContent).toContain('Alimentos');
      expect(contenedor.textContent).toContain('Juguetes');
    });

    it('debería llamar a onSelectCategory con la categoría correcta al hacer clic', () => {
      const botones = contenedor.querySelectorAll('button');
      const botonAlimentos = Array.from(botones).find(btn => btn.textContent.includes('Alimentos')); 
      
      act(() => {
          botonAlimentos.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(funcionSeleccionarCategoria).toHaveBeenCalledWith('Alimentos');
    });
  });

  describe('Componente: Header', () => {
    beforeEach(() => {
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      act(() => {
        root.render(
          <MemoryRouter> 
            <Header />
          </MemoryRouter>
        );
      });
      localStorage.clear();
    });

    afterEach(() => {
      act(() => {
        root.unmount();
      });
      document.body.removeChild(contenedor);
      contenedor = null;
    });

    it('debería mostrar/ocultar el menú móvil al hacer clic en el botón hamburguesa', () => {
      const mobileMenuButtonContainer = contenedor.querySelector('div.md\\:hidden'); 
      expect(mobileMenuButtonContainer).not.toBeNull(); 
      const botonHamburguesa = mobileMenuButtonContainer.querySelector('button');
      expect(botonHamburguesa).not.toBeNull();

      const mobileMenuSelector = 'div[class*="md:hidden"][class*="absolute"] ul';

      let mobileMenu = contenedor.querySelector(mobileMenuSelector);
      expect(mobileMenu).toBeNull(); 

      act(() => {
        botonHamburguesa.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      
      mobileMenu = contenedor.querySelector(mobileMenuSelector);
      expect(mobileMenu).not.toBeNull(); 
      const menuItems = mobileMenu.querySelectorAll('li');
      expect(menuItems.length).toBeGreaterThan(0);
      expect(mobileMenu.textContent).toContain('Catálogo');

      act(() => {
        botonHamburguesa.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      
      mobileMenu = contenedor.querySelector(mobileMenuSelector);
      expect(mobileMenu).toBeNull(); 
    });
  });

});

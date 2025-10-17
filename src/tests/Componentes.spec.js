/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable jest/no-jasmine-globals */
/* eslint-disable no-undef */

import React from 'react';
import { createRoot } from 'react-dom/client';
// 1. Importa 'act'
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

// Importa los componentes
import Footer from '../components/organisms/Footer';
import Logo from '../components/molecules/Logo';
import Button from '../components/atoms/Button';
import FormField from '../components/atoms/FormField';
import CatalogProductCard from '../components/molecules/CatalogProductCard';
import PaginaLogin from '../pages/PaginaLogin';

describe('Pruebas para los Componentes de BlackMarkPet', () => {
  let contenedor;
  let root;

  // --- Bloque 1: Pruebas para el componente Footer ---
  describe('Componente: Footer', () => {
    beforeEach(() => {
      contenedor = document.createElement('div');
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      // 2. Envuelve el renderizado en act
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

  // --- Bloque 2: Pruebas para el componente Logo ---
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

  // --- Bloque 3: Pruebas para el componente Button ---
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
      // 3. Envuelve la acción del usuario en act
      act(() => {
        boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(miFuncionClick).toHaveBeenCalled();
    });

    it('debería mostrar el texto que se le pasa como hijo (children)', () => {
      expect(contenedor.textContent).toBe('Mi Botón');
    });
  });

  // --- Bloque 4: Pruebas para el componente FormField ---
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

  // --- Bloque 5: Pruebas para el componente CatalogProductCard ---
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

    it('debería llamar a localStorage.setItem al añadir un producto al carrito', () => {
      const boton = contenedor.querySelector('button');
      act(() => {
        boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalled();
    });
  });

  // --- Bloque 6: Pruebas para el componente PaginaLogin ---
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
  });
});
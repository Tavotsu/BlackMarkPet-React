# BlackMarkPet 🐾

**BlackMarkPet** es una tienda en línea especializada en productos para mascotas, desarrollada con React. El proyecto ofrece una experiencia completa de e-commerce con gestión de productos, carrito de compras, sistema de usuarios y panel de administración.

## 🚀 Características Principales

### Para Usuarios
- **Catálogo de productos** con filtros por categoría (Alimentos, Juguetes, Higiene, Accesorios)
- **Carrito de compras** con gestión de cantidades y persistencia en localStorage
- **Sistema de autenticación** con validación de correos institucionales (@duocuc.cl, @profesor.duoc.cl)
- **Proceso de checkout** con simulación de pagos
- **Sección de ofertas** con descuentos destacados
- **Blog** con noticias y consejos para mascotas
- **Diseño responsive** optimizado para dispositivos móviles

### Para Administradores
- **Panel de administración** protegido con rutas privadas
- **Gestión completa de productos**: crear, editar y eliminar
- **Gestión de usuarios**: visualizar y administrar cuentas registradas
- **Dashboard** con estadísticas del sistema

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca principal para la interfaz de usuario
- **React Router DOM** - Navegación y gestión de rutas
- **Tailwind CSS** - Framework de estilos con utilidades
- **SweetAlert2** - Alertas y notificaciones elegantes
- **Jasmine + Karma** - Testing unitario de componentes
- **Webpack + Babel** - Bundling y transpilación

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/blackmarkpet.git
cd blackmarkpet
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🧪 Ejecutar Tests

```bash
npm test
```

Para ejecutar los tests con Karma:
```bash
npm run test:karma
```

## 📦 Build para Producción

```bash
npm run build
```

Esto generará una carpeta `/build` con los archivos optimizados para producción.

## 👤 Credenciales de Administrador

Para acceder al panel de administración:

- **Email:** `admin@blackmarkpet.cl`
- **Contraseña:** `admin123*`

## 🎯 Estructura del Proyecto

```
src/
├── assets/              # Recursos estáticos (imágenes, logos)
├── components/
│   ├── atoms/          # Componentes básicos reutilizables
│   ├── molecules/      # Componentes compuestos
│   └── organisms/      # Componentes complejos
├── data/               # Datos estáticos y configuraciones
├── pages/              # Páginas principales de la aplicación
├── tests/              # Tests unitarios
└── App.js              # Componente principal

```

## 🔐 Validaciones de Registro

El sistema implementa validaciones estrictas para el registro de usuarios:

- **Nombre:** Mínimo 4 caracteres
- **Correo:** Solo dominios @duocuc.cl o @profesor.duoc.cl
- **Contraseña:** Mínimo 8 caracteres, debe incluir:
  - Al menos una letra
  - Al menos un número
  - Al menos un símbolo (@, $, !, *, ?, &)

## 🛒 Funcionalidades del Carrito

- Añadir productos con notificación visual
- Modificar cantidades desde la página del carrito
- Eliminar productos individuales
- Cálculo automático del total
- Persistencia de datos en localStorage
- Contador de items en el header

## 🎨 Componentes Destacados

### Atomic Design
El proyecto sigue la metodología de **Atomic Design**:

- **Atoms:** Button, FormField, NavLink
- **Molecules:** BlogCard, CatalogProductCard, OfferCard, ProductCard, Logo
- **Organisms:** Header, Footer, Hero, FilterSidebar, ContactForm, AdminDashboard

### Rutas Protegidas
Componente `RutaAdmin` que protege las rutas de administración verificando el rol del usuario.

## 📱 Responsive Design

La aplicación es completamente responsive con:
- Menú hamburguesa en móviles
- Grid adaptativo para productos
- Diseño optimizado para tablets y escritorio

## 🎨 Paleta de Colores

- **Primario:** Orange Standard (#f97316)
- **Fondo:** Neutral 900 (#171717)
- **Tarjetas:** Neutral 800 (#262626)
- **Texto:** Blanco y tonos de gris

## 📄 Páginas Disponibles

- `/` - Página principal
- `/catalogo` - Catálogo de productos
- `/ofertas` - Ofertas especiales
- `/blogs` - Lista de blogs
- `/blog/:id` - Detalle de blog
- `/nosotros` - Información de la empresa
- `/contacto` - Formulario de contacto
- `/login` - Inicio de sesión
- `/registro` - Registro de usuarios
- `/carrito` - Carrito de compras
- `/checkout` - Proceso de pago
- `/pago-exitoso` - Confirmación de compra
- `/pago-fallido` - Error en el pago
- `/admin` - Panel de administración (protegido)
- `/admin/productos` - Gestión de productos
- `/admin/usuarios` - Gestión de usuarios

## 👥 Desarrolladores

- **Gustavo Santana** - Co-Fundador y CEO
- **Cristóbal Valdebenito** - Co-Fundador y CTO

## 📝 Licencia

© 2025 BlackMarkpet. Todos los derechos reservados.

---

**Nota:** Este proyecto fue desarrollado con fines educativos como parte de un proyecto académico en DuocUC.

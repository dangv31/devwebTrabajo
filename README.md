# 🛍️ Variedades El Berriondo - Tienda Online

Bienvenido a la tienda online de **Variedades El Berriondo**, donde la berraquera se mezcla con la tecnología. Este proyecto es una SPA construida con React, que incluye funcionalidades completas de carrito de compras, sistema de administración, filtros avanzados y un toque de humor bien berriondo.

---

## 📦 Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- Node.js (v18 o superior) 👉 https://nodejs.org/
- npm (normalmente ya viene con Node.js)
- Docker

---

## 🚀 Instalación del proyecto

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. **Instala las dependencias:**
```bash
npm install
```

Esto instalará:
- `react-router-dom`
- `react-icons`
- `react-toastify`
- `tailwindcss` y dependencias
- Otros paquetes esenciales

---

3. **Inicia el proyecto:**
```bash
--Dentro de /frontend--
npm run dev
--Dentro de /Backend/Variedades-Don-Berriondo--
docker-compose up --build
```
Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 👨‍💻 Funcionalidades destacadas

- 🛒 Carrito de compras con control de stock
- 🔐 Login/Logout con persistencia local
- 🎛️ Panel de administrador (editar, eliminar, agregar productos/categorías)
- 🎯 Filtros: categoría, precio y ofertas
- 🔔 Notificaciones con `react-toastify`
- 🌈 Interfaz con `TailwindCSS`
- 🧠 Humor integrado 😄

---

## 🛠️ Usuario Administrador de prueba
- admin@berriondo.com
- contraseña: admin123


## 🧼 Datos persistentes

Este proyecto usa `localStorage` para:
- Guardar sesión del usuario
- Carrito de compras
- Productos y categorías personalizadas

---

## 📂 Estructura del proyecto

```
src/
├── assets/             # Imágenes y datos por defecto
├── components/         # Componentes reutilizables
├── context/            # Contexto global (ShopContext)
├── pages/              # Vistas principales (Home, Admin, Login...)
├── App.jsx             # Enrutamiento principal
└── main.jsx            # Entrada de la app
```

---

# 🛍️ SistemaPos - Sistema de Punto de Venta Completo

<p align="center">
  <a href="https://laravel.com" target="blank">
    <img src="https://laravel.com/img/logomark.min.svg" width="120" alt="Laravel Logo" />
  </a>
</p>

<p align="center">
  <strong>Sistema Integral de Punto de Venta (POS) Profesional</strong><br>
  <em>Gestiona productos, proveedores, clientes, inventario y ventas con interfaz moderna y responsive</em>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel" alt="Laravel" /></a>
  <a href="#"><img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react" alt="React" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/PostgreSQL-15%2B-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://img.shields.io/badge/SweetAlert2-UI%20Alerts-0099FF?style=for-the-badge&logo=javascript" alt="SweetAlert2" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Status-Development-yellow?style=for-the-badge" alt="Status" /></a>
</p>

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Comandos Disponibles](#comandos-disponibles)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Autor](#autor)

---

## ✨ Características

### 🛒 Módulo de Ventas (POS)
- ✅ Interfaz moderna y responsive para ventas rápidas
- ✅ Búsqueda y filtrado de productos en tiempo real
- ✅ Carrito de compras interactivo
- ✅ Control de cantidad por producto
- ✅ Cálculo automático de impuestos (IVA)
- ✅ Sistema de descuentos (porcentaje)
- ✅ Múltiples métodos de pago:
  - Efectivo (con cálculo de cambio)
  - Tarjeta de crédito/débito
  - Transferencia bancaria
  - Pagos combinados
- ✅ Recibos digitales

### 📦 Gestión de Productos
- ✅ CRUD completo de productos
- ✅ Control de stock en tiempo real
- ✅ Cálculo automático de margen de ganancia
- ✅ Categorías de productos
- ✅ Precios de costo y venta
- ✅ SKU único por producto
- ✅ Historial de movimientos de stock

### 👥 Gestión de Proveedores
- ✅ CRUD de proveedores
- ✅ Datos de contacto y notas
- ✅ Teléfono, email y dirección
- ✅ NIT único por proveedor
- ✅ Historial de compras

### 👤 Gestión de Clientes
- ✅ Base de datos de clientes
- ✅ Registro de compras por cliente
- ✅ Información de contacto
- ✅ Historial de transacciones

### 📊 Dashboard
- ✅ Resumen de ventas del día
- ✅ Productos más vendidos
- ✅ Total de transacciones
- ✅ Estadísticas de inventario

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Software | Versión | Enlace |
|----------|---------|--------|
| **PHP** | 8.2+ | [Descargar](https://www.php.net/downloads) |
| **Composer** | 2.x | [Descargar](https://getcomposer.org/download/) |
| **Node.js** | 18.x+ | [Descargar](https://nodejs.org/) |
| **npm** | 9.x+ | Viene con Node.js |
| **PostgreSQL** | 15+ | [Descargar](https://www.postgresql.org/download/) |
| **Git** | Último | [Descargar](https://git-scm.com/downloads) |

### Verificar instalación

```bash
# PHP
php -v

# Composer
composer --version

# Node.js y npm
node -v
npm -v

# PostgreSQL
psql --version

# Git
git --version
```

---

## 📥 Instalación

### 1️⃣ Clonar el Repositorio

```bash
# Clona el repositorio
git clone https://github.com/villegas07/POS_Electronico.git

# Entra al directorio
cd SistemaPos
```

### 2️⃣ Instalar Dependencias PHP

```bash
# Instala las librerías de Laravel
composer install

# Si tienes problemas con las dependencias:
composer install --no-interaction --prefer-dist
```

### 3️⃣ Instalar Dependencias JavaScript

```bash
# Instala los paquetes de npm
npm install

# Si necesitas una instalación limpia:
rm -rf node_modules package-lock.json
npm install
```

### 4️⃣ Configurar el Archivo .env

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Genera la clave de la aplicación
php artisan key:generate
```

Edita el archivo `.env` con tus datos:

```env
APP_NAME=SistemaPos
APP_ENV=local
APP_KEY=base64:tu_clave_generada
APP_DEBUG=true
APP_URL=http://localhost:8000

# Base de datos
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=sistema_pos
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña

# Mail (opcional)
MAIL_MAILER=log
```

### 5️⃣ Crear Base de Datos

```bash
# Conecta a PostgreSQL
psql -U postgres

# En la consola de PostgreSQL:
CREATE DATABASE sistema_pos;
\q
```

### 6️⃣ Ejecutar Migraciones

```bash
# Crea las tablas en la BD
php artisan migrate

# Opcional: Llenar con datos de prueba
php artisan db:seed
```

### 7️⃣ Compilar Frontend

```bash
# Compila los archivos de React
npm run build

# O en modo desarrollo (con hot reload):
npm run dev
```

### 8️⃣ Iniciar la Aplicación

```bash
# En una terminal, inicia el servidor Laravel
php artisan serve

# Abre tu navegador en:
# http://localhost:8000
```

---

## ⚙️ Configuración

### Configuración de Base de Datos

El proyecto usa **PostgreSQL** por defecto. Para cambiar:

1. Edita `.env`
2. Cambia `DB_CONNECTION` a `mysql` o `sqlite`
3. Configura los parámetros correspondientes
4. Ejecuta `php artisan migrate:fresh`

### Configuración de CORS (si es necesario)

Edita `config/cors.php` para permitir dominios específicos:

```php
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## 🚀 Comandos Disponibles

### Desarrollo

```bash
# Inicia servidor de desarrollo
php artisan serve

# Compila frontend en modo desarrollo (con hot reload)
npm run dev

# Abre dos terminales y ejecuta ambos comandos simultáneamente
```

### Build Producción

```bash
# Compila para producción
npm run build

# Verifica que todo esté bien
php artisan optimize
```

### Base de Datos

```bash
# Ejecuta migraciones
php artisan migrate

# Revierte la última migración
php artisan migrate:rollback

# Revierte todas y ejecuta nuevamente
php artisan migrate:fresh

# Ejecuta seeders
php artisan db:seed

# Resetea todo (BE CAREFUL!)
php artisan migrate:fresh --seed
```

### Cache y Caché

```bash
# Limpia la caché
php artisan cache:clear

# Limpia todo
php artisan optimize:clear
```

### Testing

```bash
# Ejecuta tests
php artisan test

# Con reporte de cobertura
php artisan test --coverage
```

---

## 🏗️ Arquitectura del Proyecto

```
SistemaPos/
├── app/                          # Código backend (PHP/Laravel)
│   ├── Http/
│   │   ├── Controllers/         # Controladores de la API
│   │   └── Requests/            # Validaciones de formularios
│   ├── Models/                  # Modelos de BD (Eloquent)
│   └── Services/                # Lógica de negocio
│
├── database/
│   ├── migrations/              # Migraciones de BD
│   ├── factories/               # Factories para tests
│   └── seeders/                 # Datos iniciales
│
├── resources/
│   └── js/
│       ├── pages/               # Páginas/Vistas React
│       │   ├── dashboard.tsx
│       │   ├── pos.tsx
│       │   ├── productos.tsx
│       │   ├── proveedores.tsx
│       │   └── clientes.tsx
│       ├── components/          # Componentes reutilizables
│       │   ├── ui/              # Componentes UI base
│       │   ├── app-sidebar.tsx
│       │   └── stock-add-card.tsx
│       ├── hooks/               # Custom Hooks
│       ├── utils/               # Utilidades
│       │   └── alerts.ts        # SweetAlert2 helpers
│       ├── types/               # Tipos TypeScript
│       └── layouts/             # Layouts principales
│
├── routes/
│   ├── api.php                  # Rutas API
│   └── web.php                  # Rutas web
│
├── config/                      # Configuración de Laravel
├── public/                      # Archivos públicos
├── storage/                     # Almacenamiento (logs, etc)
├── tests/                       # Tests unitarios e integración
├── package.json                 # Dependencias frontend
├── composer.json                # Dependencias backend
└── vite.config.ts              # Configuración de Vite
```

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Laravel 11.x** - Framework PHP robusto
- **PHP 8.2+** - Lenguaje de servidor
- **PostgreSQL** - Base de datos relacional
- **Eloquent ORM** - Gestor de base de datos

### Frontend
- **React 18.x** - Librería de UI
- **TypeScript** - JavaScript tipado
- **Tailwind CSS 3.x** - Estilos utility-first
- **Vite** - Build tool ultrarrápido
- **Axios** - Cliente HTTP
- **SweetAlert2** - Alertas modernas
- **Shadcn/ui** - Componentes UI base

### DevOps & Herramientas
- **Git** - Control de versiones
- **npm/Composer** - Gestores de paquetes
- **Vite** - Dev server y bundler

---

## 📖 Flujo de Trabajo

### Estructura de Ramas

```
main
  ├── develop (rama de desarrollo)
  │   ├── feature/usuarios
  │   ├── feature/reportes
  │   ├── bugfix/validacion
  │   └── hotfix/seguridad
```

### Convención de Commits

```
feat: agregar nueva funcionalidad
fix: corregir error
docs: cambios en documentación
style: cambios de formato
refactor: reorganizar código
test: agregar/modificar tests
chore: tareas de mantenimiento
```

### Ejemplo:
```bash
git commit -m "feat: agregar sistema de descuentos en POS"
git commit -m "fix: corregir cálculo de IVA en productos"
```

---

## 🤝 Contribuir

### Pasos para Contribuir

#### 1. Crea una rama para tu característica
```bash
# Actualiza develop
git checkout develop
git pull origin develop

# Crea tu rama (sigue la convención)
git checkout -b feature/nombre-caracteristica
```

#### 2. Realiza tus cambios
```bash
# Haz cambios en los archivos
# Asegúrate de seguir:
# - camelCase para variables
# - SweetAlert2 para alertas
# - TypeScript en todo el código
```

#### 3. Commit y Push
```bash
# Añade los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: describir cambios"

# Push a tu rama
git push origin feature/nombre-caracteristica
```

#### 4. Abre un Pull Request
- Ve a GitHub
- Abre un **Pull Request** contra la rama `develop`
- Describe los cambios claramente
- Espera la revisión

### Estándares de Código

✅ **Naming Conventions:**
- Variables: `camelCase`
- Archivos: `kebab-case` (componentes pueden ser PascalCase)
- Funciones: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`

✅ **Alertas:**
- Usa **SweetAlert2** en todo el proyecto
- Importa desde `@/utils/alerts`
- Ejemplos:
  ```typescript
  import { showSuccess, showError } from '@/utils/alerts';
  
  showSuccess('Éxito', 'Producto guardado correctamente');
  showError('Error', 'Hubo un problema al guardar');
  ```

✅ **TypeScript:**
- Siempre define tipos para props, estados y funciones
- No usar `any`
- Ejemplo:
  ```typescript
  interface ProductoProps {
    id: number;
    nombre: string;
    precio: number;
  }
  ```

---

## 📝 Metodología

El proyecto sigue la metodología definida en `AGENTS.md`:

1. **Requerimientos** - Definir qué se necesita
2. **Historias de Usuario** - Desglosar en tareas
3. **TDD** - Escribir tests primero
4. **Desarrollo** - Implementar funcionalidad

---

## 🐛 Reportar Problemas

Si encuentras un bug:

1. Verifica que no exista un issue similar
2. Crea un nuevo issue con:
   - Título descriptivo
   - Pasos para reproducir
   - Comportamiento esperado
   - Comportamiento actual
   - Capturas de pantalla (si aplica)

---

## 📄 Licencia

### ⚖️ LICENCIA PROPIETARIA

Este software es **propiedad exclusiva** de la empresa y está **completamente protegido** por derechos de autor.

#### ❌ Prohibido:
- ✗ Copiar, modificar, o distribuir este software sin autorización escrita
- ✗ Usar el software con fines comerciales no autorizados
- ✗ Reverse engineering o descompilación
- ✗ Compartir el código fuente o binarios con terceros
- ✗ Crear trabajos derivados sin consentimiento

#### ✅ Permitido:
- ✓ Usar el software únicamente para los fines autorizados
- ✓ Acceso para desarrolladores autorizados del proyecto
- ✓ Modificaciones internas del equipo de desarrollo

#### Contacto:
Para solicitar permisos especiales o licencias, contacta al propietario del proyecto.

**© 2025 - Todos los derechos reservados**

---

## 👨‍💻 Autor

**Brayan Villegas** - Desarrollador Full Stack  
[Portafolio]([https://tu-portafolio.com](https://portafolio-9d3ca.web.app/))  
[LinkedIn](www.linkedin.com/in/brayanvillegascorrales-943806260)
---

## 📞 Contacto

Correo electrónico: (brayanvillegas0719@gmail.com)

---

<div align="center">
  <strong>Hecho con ❤️ usando Laravel + React</strong>
  <br>
  <em>Software Propietario - Todos los derechos reservados © 2025</em>
</div>

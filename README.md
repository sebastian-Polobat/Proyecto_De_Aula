# 🛍️ POLOFITSPORT

Sistema web administrativo para gestión de inventario, usuarios y pedidos desarrollado con:

- HTML5
- CSS3
- JavaScript
- Spring Boot
- API REST
- LocalStorage

---

# 📌 Características

✅ Dashboard administrativo  
✅ Gestión de inventario  
✅ Gestión de usuarios  
✅ Sistema de roles  
✅ Gestión de pedidos  
✅ Login y registro  
✅ Recuperación de contraseña  
✅ API REST con Spring Boot  
✅ Interfaz responsive  

---

# 👥 Roles del Sistema

| Rol | Permisos |
|------|----------|
| Admin | Control total del sistema |
| Bodega | Editar productos y ver pedidos |
| Vendedor | Ver inventario y crear pedidos |

---

# 📂 Estructura del Proyecto

```bash
POLOFITSPORT/
│
├── index.html
├── inventario.html
├── usuarios.html
├── pedidos.html
├── login.html
├── registro.html
├── recuperar.html
│
├── styles.css
├── script.js
│
├── img/
│   └── logo.png
```

---

# ⚙️ Instalación

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/POLOFITSPORT.git
```

---

# 🚀 Backend Spring Boot

## 2️⃣ Abrir el backend

Abrir el proyecto Spring Boot en:

- IntelliJ IDEA
- VS Code
- Eclipse

---

## 3️⃣ Verificar controlador

```java
@RestController
@RequestMapping("/productos")
@CrossOrigin("*")
```

---

## 4️⃣ Ejecutar Spring Boot

El backend debe ejecutarse en:

```bash
http://localhost:8080
```

---

## 5️⃣ Verificar API

Abrir en el navegador:

```bash
http://localhost:8080/productos
```

Si aparece:

```json
[]
```

todo funciona correctamente.

---

# 🌐 Frontend

## Opción 1 — Live Server

### Instalar extensión:

- Live Server

### Ejecutar:

Abrir:

```bash
login.html
```

Click derecho:

```bash
Open with Live Server
```

---

## Opción 2 — XAMPP

Copiar la carpeta a:

```bash
C:\xampp\htdocs\
```

Abrir:

```bash
http://localhost/POLOFITSPORT/login.html
```

---

# 🔑 Credenciales Iniciales

## Admin

```bash
Correo:
admin@polofit.com

Contraseña:
12345
```

---

# 🛒 Generar Productos Automáticos

Abrir consola del navegador:

```bash
F12 → Consola
```

Ejecutar:

```javascript
generarProductosDemo()
```

---

# 📸 Capturas

## Dashboard

Agrega aquí tus screenshots:

```md
![Dashboard](img/dashboard.png)
```

---

# 🧠 Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- Spring Boot
- REST API
- LocalStorage

---

# 📱 Responsive Design

El sistema está adaptado para:

- 💻 Computadores
- 📱 Tablets
- 📲 Móviles

---

# 🔒 Seguridad Implementada

- Control de roles
- Validación de formularios
- Protección de acceso por sesión
- Restricción de vistas

---

# 👨‍💻 Autor

## Sebastian Andres Polo Gonzales

Proyecto académico — POLOFITSPORT

---

# 📄 Licencia

Este proyecto fue desarrollado con fines educativos.

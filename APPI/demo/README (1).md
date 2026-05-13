#  Proyecto API REST - Spring Boot (POO)

##  Nombre del proyecto
API REST en Spring Boot con arquitectura en capas (sin base de datos)

##  Descripción
Este proyecto es una API REST desarrollada con Spring Boot, aplicando programación orientada a objetos (POO). Los datos se manejan en memoria usando Map (HashMap), sin base de datos. Incluye módulos de Usuarios y Productos con separación en capas (Controller, Service, Repository y DTO).

##  Tecnologías utilizadas
- Java 17
- Spring Boot
- Spring Web
- Maven
- DTOs
- HashMap en memoria
- Arquitectura en capas

##  Cómo ejecutar el proyecto
Clonar el repositorio:
git clone https:[//github.com/TU-USUARIO/TU-REPO.git](https://github.com/toxico292008-afk/demo1)

Abrir en IntelliJ IDEA y ejecutar la clase:
DemoApplication.java

La API queda disponible en:
http://localhost:8080

##  Endpoints

###  Usuario
- GET /usuarios
- GET /usuarios/{id}
- POST /usuarios
- PUT /usuarios/{id}
- DELETE /usuarios/{id}

###  Producto
- GET /productos
- GET /productos/{id}
- POST /productos
- PUT /productos/{id}
- DELETE /productos/{id}

##  Ejemplos JSON

### Usuario (entrada)
{
  "nombre": "Sebastian",
  "email": "Sebas@gmail.com"
}

### Usuario (salida)
{
  "id": 1,
  "nombre": "Sebastian",
  "email": "Sebastian@gmail.com"
}

### Producto (entrada)
{
  "nombre": "Laptop",
  "precio": 2500.0,
  "stock": 5
}

### Producto (salida)
{
  "id": 1,
  "nombre": "Laptop",
  "precio": 2500.0,
  "stock": 5
}

## Evidencia del uso de IA

Prompts usados: Se usó IA para generar la estructura del proyecto, CRUD y documentación del API en Spring Boot.

Qué generó la IA: Generó la arquitectura en capas, endpoints REST, DTOs, validaciones y ejemplos de JSON.

Qué corrigió el grupo: Se ajustaron nombres de paquetes, validaciones y detalles de endpoints según los requerimientos del docente.

##  Evidencia de pruebas

![Postman](https://github.com/toxico292008-afk/akeno1212/blob/6fbfa3c8a6f4b65b545ec4c6b365fbe7a081f646/Captura%20de%20pantalla%202026-04-17%20002748.png)

![image alt](https://github.com/toxico292008-afk/akeno1212/blob/6fbfa3c8a6f4b65b545ec4c6b365fbe7a081f646/Captura%20de%20pantalla%202026-04-17%20002237.png)

![image alt](https://github.com/toxico292008-afk/akeno1212/blob/6fbfa3c8a6f4b65b545ec4c6b365fbe7a081f646/Captura%20de%20pantalla%202026-04-17%20002139.png)

##  Autor
Juan Jose Rodriguez Gomez- Juan David Narvaez Mosquera- Fredy ALejandro Olaya - Sebastian Andres Polo Gonzales

Proyecto realizado por el grupo de desarrollo - Spring Boot API REST

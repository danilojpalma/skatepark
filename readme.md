## Skate Park - Aplicación web para patinadores

Este proyecto es una implementación de una aplicación web para patinadores donde los usuarios pueden crear una cuenta, iniciar sesión, actualizar su perfil y eliminar su cuenta. La aplicación utiliza Node.js con Express para el backend, PostgreSQL para la base de datos, y Handlebars para el frontend.

### Características:

- Registro de usuarios: Los usuarios pueden crear una cuenta ingresando su correo electrónico, nombre, contraseña, años de experiencia y especialidad.
- Inicio de sesión: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.
- Actualización de perfil: Los usuarios pueden actualizar su perfil ingresando nueva información en los campos correspondientes.
- Eliminación de cuenta: Los usuarios pueden eliminar su cuenta de forma permanente.



### Prerrequisitos

Para poder ejecutar la API, se deben cumplir los siguientes prerrequisitos:

- Node.js 
- PostgreSQL .
- Tener instalado un cliente de PostgreSQL, como por ejemplo pgAdmin.


### Instalación

Para instalar la API, se deben seguir los siguientes pasos:

1. Clonar el repositorio
```bash
git clone https://github.com/danilojpalma/skatepark.git
```
2. Acceder al directorio del repositorio.
```bash
cd skatepark
```
3. Instalar las dependencias del proyecto.
```bash
npm install
```
4. Crear la base de datos en PostgreSQL.

Para crear la base de datos, se debe ejecutar el siguiente comando en el cliente de PostgreSQL:
```sql
CREATE TABLE skaters (
    id SERIAL, 
    email VARCHAR(50) NOT NULL, 
    nombre VARCHAR(25) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    anos_experiencia INT NOT NULL, 
    especialidad VARCHAR(50) NOT NULL, 
    foto VARCHAR(255) NOT NULL, 
    estado BOOLEAN NOT NULL);
```
Aegurarse que la columna password tenga por lo menos 100 caracteres, esto debido a que las contraseña se almacenan encriptadas.

5. Configurar la conexión a la base de datos.

Debes crear un archivo en la carpeta raiz con el nombre `.env`, en donde se deben configurar las variables de entorno segun tu configuración en tu cliente de PostgreSQL.
```javascript

DB_HOST = localhost
DB_USER = postgres
DB_PASSWORD = contraseña
DB_DATABASE = skatepark
SK="clavesecreta"
ADMIN_EMAIL="admin@admin.com"
ADMIN_PASSWORD="admin1234"
```
### Uso:

Ejecute el servidor con

```bash
npm run dev
```

Abra su navegador web y navegue hasta http://localhost:3000.

### Ingresar como administrador

- Crea las variables de entorno ADMIN_EMAIL y ADMIN_PASSWORD
- Inicia sesión con esas credenciales y podrás acceder a la ruta /admin
- En ella podrás visualizar todos los usuarios y cambiar su estado.
- Los cambios en los estados se aplican automáticamente
- Vuelve a la ruta raíz `/` con el enlace "volver al inicio" para ver los cambios.

### Ingresar como usuario normal

- Regístrate con tu correo y todos los datos requeridos
- Ingresa a la vista de inicio de sesión e ingresa tu correo y contraseña
- Al iniciar sesión, podrás acceder a la vista de edición de perfil donde podrás modificar tu contraseña y otros datos.
- Haz clic en "actualizar" si deseas actualizar tu perfil.
- Haz clic en "eliminar" si deseas eliminar tu perfil.


### Código fuente

El código fuente de la API se encuentra en el siguiente repositorio de GitHub:

[https://github.com/danilojpalma/skatepark.git](https://github.com/danilojpalma/skatepark.git)


### Licencia

Este proyecto se encuentra bajo la licencia MIT. Para más información, consultar el archivo `LICENSE.md`.
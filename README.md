# Rest Web Server Agenda

Guía sencilla para la instalación, ejecución y mantenimiento del proyecto.

## Requisitos Previos

- **Node.js**: Versión 20.x o superior.
- **Docker**: Para gestionar la base de datos.
- **Gestor de Paquetes**: `pnpm`, `npm` o `yarn`.

---

## 1. Configuración Inicial

Antes de ejecutar el proyecto, sigue estos pasos:

1.  **Clonar el archivo de entorno**:
    Copia el archivo `.env.template` y renómbralo a `.env`. Ajusta las variables de entorno según tu configuración local, especialmente las credenciales de la base de datos.

    ```bash
    # Ejemplo en Windows (cmd)
    copy .env.template .env
    ```

2.  **Instalar dependencias**:
    Abre una terminal en la raíz del proyecto e instala las dependencias usando tu gestor de paquetes preferido.

    Con `pnpm`:
    ```bash
    pnpm install
    ```
    Con `npm`:
    ```bash
    npm install
    ```
    Con `yarn`:
    ```bash
    yarn install
    ```

---

## 2. Levantar la Base de Datos con Docker

El proyecto utiliza una base de datos PostgreSQL gestionada a través de Docker.

- **Iniciar el contenedor**:
  Asegúrate de tener Docker Desktop en ejecución y luego ejecuta el siguiente comando para iniciar el contenedor de la base de datos en segundo plano.

  ```bash
  docker-compose up -d
  ```

- **Detener el contenedor**:
  Para detener el servicio de la base de datos, usa:
  ```bash
  docker-compose down
  ```

---

## 3. Gestión de la Base de Datos con Prisma

Prisma es el ORM utilizado para interactuar con la base de datos.

- **Actualizar el cliente de Prisma**:
  Después de cualquier cambio en el esquema (`schema.prisma`), es necesario regenerar el cliente de Prisma.

  Con `pnpm`:
  ```bash
  pnpx prisma generate
  ```
  Con `npm`:
  ```bash
  npx prisma generate
  ```
  Con `yarn`:
  ```bash
  yarn prisma generate
  ```

- **Aplicar cambios del esquema a la BD**:
  Para sincronizar el esquema de Prisma con la base de datos, puedes usar `db push` (para prototipado) o `migrate dev` (para desarrollo con migraciones).

  *Usando migraciones (recomendado):*
  ```bash
  # pnpm
  pnpx prisma migrate dev --name "nombre-de-la-migracion"

  # npm
  npx prisma migrate dev --name "nombre-de-la-migracion"

  # yarn
  yarn prisma migrate dev --name "nombre-de-la-migracion"
  ```

---

## 4. Ejecutar el Proyecto

Una vez que la base de datos esté activa y las dependencias instaladas, puedes iniciar el servidor en modo de desarrollo.

- **Iniciar en modo desarrollo**:
  Este comando iniciará el servidor y lo reiniciará automáticamente cada vez que detecte un cambio en los archivos.

  Con `pnpm`:
  ```bash
  pnpm run dev
  ```
  Con `npm`:
  ```bash
  npm run dev
  ```
  Con `yarn`:
  ```bash
  yarn dev
  ```

El servidor estará disponible en la URL que hayas configurado en tu archivo `.env` (por defecto, `http://localhost:3000`).
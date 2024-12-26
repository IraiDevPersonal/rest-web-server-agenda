## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` o `bun install` o `yarn install` para instalar las dependencias
3. Para levantar la base de datos primero abrir Docker Desktop y ejecutar el comando `docker-compose up -d` desde la la ruta base del proyecto.

- Si no se tiene la imagen de postgre ir descargar con el siguiente comando `docker pull postgres:15.3`, la version es conversable.

- `prisma db pull` para traer los esquemas de la base de datos a esquemas de prisma
- `prisma generate` para crear el cliente de prisma

4. Ejecutar `npm run dev` o `bun dev` o `yarn dev` para levantar el proyecto en modo desarrollo

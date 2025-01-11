## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` o `bun install` o `yarn install` para instalar las dependencias
3. Para levantar la base de datos primero abrir Docker Desktop y ejecutar el comando `docker-compose up -d` desde la la ruta base del proyecto.

- Si no se tiene la imagen de postgre ir descargar con el siguiente comando `docker pull postgres:15.3`, la version es conversable.

- `prisma db pull` para traer los esquemas de la base de datos a esquemas de prisma
- `prisma generate` para crear el cliente de prisma

4. Ejecutar `npm run dev` o `bun dev` o `yarn dev` para levantar el proyecto en modo desarrollo
   do=/

## cambios 29-12-2024 por Sebastian Acuña

1. se agregan features de segun tablas en bd ( solo contienen el modelo)
2. para aplicar los cambios se debe primero realizar lo siguiente:
   - eliminar bd actual ( si es que se tiene creada )
   - ejecutar `docker-compose up -d`,
   - ejecutar `npx prisma db push`
3. una vez creada la bd con las tablas:

   - _appointment_
   - _appointment_status_
   - _patients_
   - _roles_
   - _schedules_
   - _users_

   levantar servicio con `npm run dev` o `bun dev` o `yarn dev`

4. una vez levantado el servicio ejecutar enpoint ubicado en `/api/seed/seed` para que se poble la bd

## cambios 10-01-2025 por Sebastian Acuña

1. se cambiaron todos los modelos por entities agregando funciones estaticas de validacion en las clases
2. se cambiaron tablas de la bd, por lo que se debe volver a ejecutar `npx prisma db push`
3. se agrega EndPoint de agenda, para consumirlo se debe ejecutar

   ```
      METHOD: GET
      URL:localhost:3000/api/agenda/hours/:type
      type = TO_CONFIRM | CONFIRMED | CANCELLED
      RESPONSE :

         export interface Main {
            data: Datum[];
         }
         export interface Datum {
            uid: string;
            patient: Patient;
            appointment_status: string;
            schedule: Schedule;
         }

         export interface Patient {
            uid: string;
            rut: string;
            names: string;
            last_names: string;
            email: string;
            phone: string;
            is_admin?: boolean;
            role?: Role;
         }

         export interface Role {
            id: number;
            name: string;
         }

         export interface Schedule {
            uid: string;
            week_day: string;
            date: Date;
            time_from: string;
            time_to: string;
            is_enabled: boolean;
            professional: Patient;
         }
   ```

### notas del parche

falta el tipo AVAILABLES que ese debe mostrar los schedules ** no se si mantener separado schedule de appointment, me suenan a lo mismo **

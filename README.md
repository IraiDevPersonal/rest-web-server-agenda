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

## cambios 25-01-2025 V1.0.1 por Sebastian Acuña

- se cambio estructura de bd, se agregan tablas como professional, profession, y se ajustan las demas tablas para congeniar con las creadas

## cambios 09-02-2025 V1.1.1 por SMAP

- se modifica seed para llenar tablas nuevas
- se modifica EP de agenda para listar separadas por estado.

## cambios 10-02-2025 V1.2.1 por SMAP

- se modifica respuesta de agenda segun conversado
- correcciones menores
- ep agenda GET `http://localhost:3000/api/agenda/hours`

```
export interface Data {
    availables: Appointments[];
    cancelled:  Appointments[];
    confirmed:  Appointments[];
    toConfirm:  Appointments[];
}

export interface Appointments {
    uid:               string;
    date:              string;
    time_from:         string;
    time_to:           string;
    patient_name:      string;
    patient_rut:       string;
    patient_phone:     string;
    professional_name: string;
    professions:       string[];
}
```

## cambios 13-02-2025 V1.3.1 por SMAP

cambios en estructura, se separo el backoffice (mantenedores) de los casos de uso ya que estaba muy desordenado y las clases estaban corruptas con muchos datos condicionales.

se creará una entidad por caso de uso para la agenda, getMyDay es para pantalla mi dia, y asi.
en bd solo deje pacienteId como posible nulo en los appointments ya que al estar disponible no tendra pacientes.

extra: se agrega filtro por fecha y por rut de paciente (por aproximacion no exacto)

## cambios 16-02-2025 v1.4.1 por SMAP

- se corrige nombre de profesional en GetMyDay
- se agrega EP para profesiones
  GET http://localhost:3000/api/profession/

respuesta es {id:number, name:string} no se si adaptarlo a label, value ya que eso es para el FE solamente.

## cambios 24-02-2025 v1.5.1 por SMAP

- se modifica filtros de agenda, se agrega `profession_id` y `professional_id`
- se agrega ep de professionales

```
http:localhost:3000/api/professional/to-filter
```

metodo: GET, filtro opcional : profession_id

## cambios 26-02-2025 v1.6.2 por SMAP

- se corrige error en apellido de profesional en to-filter
- se agrega ep to-filter para profession, aceptando filtro por id y name

## cambios 01-03-2025 v1.7.2 por SMAP

- se agrega EP calendar/ , mismos filtros que get-my-day

```
GET http:localhost:3000/api/calendar/
```

## cambios 03-03-2025 v1.8.2 por SMAP

- se agrega propiedad year_month a filtros de / de calendar.
  valor esperado es formato YYYY-MM, ej: 2025-03

## cambios 10-03-2025 v1.9.2 por SMAP

- se agrega EP para obtener detalle de un appointment en agenda

method: GET,
url: http:localhost:3000/api/agenda/detail/:uid
respuesta segun hablado

OJO: no se valida el uid, por ende si no envias uno en un formato valido manda error, dejo pendiente esa validacion para pararlo antes de llegar a la bd.

## cambios 18-03-2025 v1.10.2 por SMAP

- se agrega middlweare en EP para obtener el detalle del appointment, para que devuelva error al enviar un uid invalido

##cambios 18-03-2025 v1.11.2 por SMAP

- se habilita ep para crear paciente
  POST http:localhost:3000/api/patient/
  BODY:

```
{
  "rut":"188040667",
  "names":"sin nombre",
  "last_names":"sin apellidos",
  "email":"email_valido",
  "phone":"phone valido",
  "address":"calle falsa 123"
}
```

- falta validar campos de mejor manera,
- zod devuelve mensaje en ingles
- devolver algo al crear usuario

- se actualizo la estructura de directorios y se ordeno el codigo, ademas todas las validaciones estan pasando por zod y los modelos se infieren de los equemas de zod, en los mappers se encuentran las validaciones para las respuestas de cada endpoint
- se agregaron las colecciones de bruno para probar los endpoints
- los nombres de los endpoints sufrieron algunos cambios
- aun se conservan los erroes de zod en ingles, pero aun no lo veo necesario ya que esas validaciones son de servidor, no deberian llegar al cliente (almenos en los mappers que devuelven estructuras de datos, para insersiones y actualizaciones ahi es otra cosa, ya que esos si llegarian al cliente)
- para que es seed funcione de debe tener la variable de entorno IS_PRODUCTION=false, por defecto en config/envs este valor esta en true, asi que si no esta en el .env el seed sera detenido

- cada que se agregue una tabla en la base de datos, agregar el tipo en src/types/bd-model.ts para mantener los tipos de BD (si falta alguno que no haya agregar agregar)

- actualizacion 05-08-2025 normalizacion de todos los modulos, aplicacion de variante de arquitactura limpia y principios solid (hasta donde logro entender xDD), a falta de globlizar schemas de zod que puedan compartirse (para manejar los mensajes de error desde un solo punto para aquellos modelos que compartan validaciones), para cada modulo se agregaron los use-cases con el fin de mantener completamente limpios los controladores

- actualizacion 05-08-2025 se actualizo el esquema de bruno.json para probar los endpoints

/*
  Warnings:

  - The values [TO_CONFIRM,CONFIRMED,CANCELLED,AVAILABLE,INDETERMINATE] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [LUNES,MARTES,MIERCOLES,JUEVES,VIERNES,SABADO,DOMINGO] on the enum `WeekDay` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentStatus_new" AS ENUM ('to-confirm', 'confirmed', 'cancelled', 'available', 'indeterminate');
ALTER TABLE "appointment" ALTER COLUMN "appointment_status" TYPE "AppointmentStatus_new" USING ("appointment_status"::text::"AppointmentStatus_new");
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "AppointmentStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WeekDay_new" AS ENUM ('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo');
ALTER TABLE "schedules" ALTER COLUMN "week_day" TYPE "WeekDay_new" USING ("week_day"::text::"WeekDay_new");
ALTER TYPE "WeekDay" RENAME TO "WeekDay_old";
ALTER TYPE "WeekDay_new" RENAME TO "WeekDay";
DROP TYPE "WeekDay_old";
COMMIT;

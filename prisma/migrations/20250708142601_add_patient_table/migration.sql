/*
  Warnings:

  - You are about to drop the column `appointment_status_id` on the `appointment` table. All the data in the column will be lost.
  - The `uid` column on the `patients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uid` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `appointment_status` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uid]` on the table `appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rut]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rut]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointment_status` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `week_day` on the `schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('TO_CONFIRM', 'CONFIRMED', 'CANCELLED', 'AVAILABLE');

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_appointment_status_id_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_professional_id_fkey";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "appointment_status_id",
ADD COLUMN     "appointment_status" "AppointmentStatus" NOT NULL,
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "patient_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "uid",
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "week_day",
ADD COLUMN     "week_day" "WeekDay" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "uid",
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- DropTable
DROP TABLE "appointment_status";

-- CreateTable
CREATE TABLE "professions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "professions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionals" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "service_provider_id" INTEGER,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professional_professions" (
    "professional_id" BIGINT NOT NULL,
    "profession_id" INTEGER NOT NULL,

    CONSTRAINT "professional_professions_pkey" PRIMARY KEY ("profession_id","professional_id")
);

-- CreateTable
CREATE TABLE "service_providers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rut" TEXT NOT NULL,

    CONSTRAINT "service_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_provider_codes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "service_provider_id" INTEGER NOT NULL,

    CONSTRAINT "service_provider_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appointment_uid_key" ON "appointment"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "patients_uid_key" ON "patients"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "patients_rut_key" ON "patients"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_uid_key" ON "schedules"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_rut_key" ON "users"("rut");

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_service_provider_id_fkey" FOREIGN KEY ("service_provider_id") REFERENCES "service_providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_professions" ADD CONSTRAINT "professional_professions_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_professions" ADD CONSTRAINT "professional_professions_profession_id_fkey" FOREIGN KEY ("profession_id") REFERENCES "professions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_provider_codes" ADD CONSTRAINT "service_provider_codes_service_provider_id_fkey" FOREIGN KEY ("service_provider_id") REFERENCES "service_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

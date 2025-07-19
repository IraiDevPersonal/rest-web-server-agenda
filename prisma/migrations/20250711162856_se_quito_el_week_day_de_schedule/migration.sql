/*
  Warnings:

  - You are about to drop the column `week_day` on the `schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "week_day";

-- DropEnum
DROP TYPE "WeekDay";

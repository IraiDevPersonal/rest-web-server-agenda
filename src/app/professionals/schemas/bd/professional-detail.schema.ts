import z from "zod";
import { ProfessionalSchema } from "./professional.schema";
import { Gender } from "@prisma/client";

export const ProfessionalDetailSchema = ProfessionalSchema.extend({
  gender: z.enum(Gender, { error: "invalid gender" }),
  birth_date: z.date().optional()
});

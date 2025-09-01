import z from "zod";
import { UserSchema } from "./user.schema";
import { Gender } from "@prisma/client";

export const UserDetailSchema = UserSchema.extend({
  gender: z.enum(Gender, { error: "invalid gender" }),
  birth_date: z.date().optional()
});
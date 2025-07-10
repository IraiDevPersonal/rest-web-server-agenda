import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { z } from "zod";

export const RoleSchema = z.object({
  id: z.optional(z.number()),
  name: z
    .string()
    .min(0, { message: "El nombre del rol no puede estar vacío" }),
});

type Init = z.infer<typeof RoleSchema>;

export class RoleEntity {
  public id?: number | undefined;
  public name: string;

  private constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
  }

  static validate(object: any): RoleEntity {
    try {
      const schema = this.getSchema().parse(object);
      return new RoleEntity(schema);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  static responseAdapter(data: any): RoleEntity[] {
    try {
      if (!Array.isArray(data)) {
        throw new Error("user-entity.ts: (responseAdapter) Se esperaba un arreglo");
      }

      return safeArray<RoleEntity>(data).map(this.validate);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  static getSchema() {
    return RoleSchema;
  }
}

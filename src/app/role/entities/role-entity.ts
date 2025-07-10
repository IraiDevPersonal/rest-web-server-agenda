import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export const RoleSchema = z.object({
  id: z.optional(z.number().positive("el valor del id debe ser un número positivo")),
  name: z
    .string()
    .min(0, { message: "El nombre del rol no puede estar vacío" }),
});

type RoleModel = z.infer<typeof RoleSchema>;

export class RoleEntity {
  public id?: RoleModel["id"];
  public name: RoleModel["name"];

  private constructor(init: RoleModel) {
    this.id = init.id ? Number(init.id) : undefined;
    this.name = String(init.name);
  }

  static getSchema() {
    return RoleSchema;
  }

  static validate(object: any): RoleModel {
    try {
      const data = RoleEntity.itemAdapter(object);
      return RoleEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(
        error,
        "user-entity.ts: (validate) Error al validar el rol: "
      ));
    }
  }

  static responseAdapter(data: any): RoleModel[] {
    try {
      return safeArray<RoleModel>(data, {
        throwErrors: true,
        errorMessage: "user-entity.ts: (responseAdapter) Se esperaba un arreglo",
      })
        .map(RoleEntity.validate);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  private static itemAdapter(item: any): RoleEntity {
    return new RoleEntity({
      id: item["id"],
      name: item["name"],
    });
  }
}

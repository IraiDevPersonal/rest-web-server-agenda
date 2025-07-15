import { ProfessionEntity } from "@/app/profession/entities/profession-entity";
import { RoleEntity } from "@/app/role/entities/role-entity";
import {
  type ProfessionalModel,
  ProfessionalSchema
} from "../models/professional";

import { CustomError } from "@/lib/custom-error";
import { Uid } from "@/lib/uid";
import { safeArray } from "@/lib/utils";

export class ProfessionalEntity {
  static validate(item: any): ProfessionalModel {
    try {
      const data = ProfessionalEntity.mapper(item);
      return ProfessionalSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "profession-entity.ts: (validate)")
      );
    }
  }

  static serverResponse(data: any): ProfessionalModel[] {
    try {
      return safeArray<ProfessionalModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesionales"
      }).map(ProfessionalEntity.validate);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (serverResponse)"
      );

      throw new Error(errorMessage);
    }
  }

  private static mapper(item: any): ProfessionalModel {
    const user = item?.user;

    return {
      id: user?.id ?? null,
      names: user?.names ?? "sin nombres",
      uid: user?.uid ?? Uid.createV4(),
      rut: user?.rut ?? "sin rut",
      last_names: user?.last_names ?? "sin apellidos",
      phone: user?.phone ?? "sin teléfono",
      email: user?.email ?? "sin correo",
      role: RoleEntity.validate(user?.role),
      professions: ProfessionEntity.toArray(item?.professional_profession)
    };
  }
}

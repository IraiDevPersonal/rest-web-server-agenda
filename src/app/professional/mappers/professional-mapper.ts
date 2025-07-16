import { ProfessionMapper } from "@/app/profession/entities/profession-mapper";
import { RoleMapper } from "@/app/role/entities/role-mapper";
import {
  type ProfessionalModel,
  ProfessionalSchema
} from "../models/professional";

import { CustomError } from "@/lib/custom-error";
import { Uid } from "@/lib/uid";
import { safeArray } from "@/lib/utils";

export class ProfessionalMapper {
  static validate(item: any): ProfessionalModel {
    try {
      const data = ProfessionalMapper.mapper(item);
      return ProfessionalSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "profession-mapper.ts: (validate)")
      );
    }
  }

  static serverResponse(data: any): ProfessionalModel[] {
    try {
      return safeArray<ProfessionalModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesionales"
      }).map(ProfessionalMapper.validate);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-mapper.ts: (serverResponse)"
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
      role: RoleMapper.validate(user?.role),
      professions: ProfessionMapper.toArray(item?.professional_profession)
    };
  }
}

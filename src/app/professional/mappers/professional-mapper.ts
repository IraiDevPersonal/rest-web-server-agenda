import { ProfessionMapper } from "@/app/profession/mappers/profession-mapper";
import { RoleMapper } from "@/app/role/mappers/role-mapper";
import {
  ProfessionalForAppointmentDetailModel,
  ProfessionalForAppointmentDetailSchema,
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
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "professional-mapper.ts: (validate)")
      );
    }
  }

  static response(data: any): ProfessionalModel[] {
    return safeArray<ProfessionalModel>(data, {
      errorMessage: "professional-mapper.ts (response): se esperaba un array"
    }).map(ProfessionalMapper.validate);
  }

  static validateProfessionalForAppointmentDetail(
    item: any
  ): ProfessionalForAppointmentDetailModel {
    try {
      const user = item?.user;
      const professions = safeArray<any>(item?.professional_profession).map(
        (p, idx) => p?.professions?.name ?? `profession desconocida ${idx + 1}`
      );
      const data: ProfessionalForAppointmentDetailModel = {
        full_name: `${user?.names ?? "sin nombres"} ${user?.last_names ?? "sin apellidos"}`,
        professions: professions,
        pay_methods: ["fonasa", "particular (Efectivo, Transferencia)"],
        confirm_methods: ["whatsapp", "teléfono", "correo", "presencial"]
      };

      return ProfessionalForAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "profesional-mapper.ts: (validateProfessionalForAppointmentDetail)"
        )
      );
    }
  }

  private static mapper(item: any): ProfessionalModel {
    const user = item?.user;
    return {
      id: item?.id,
      user_id: user?.id,
      names: user?.names ?? "sin nombres",
      uid: user?.uid ?? Uid.createV4(),
      rut: user?.rut ?? "sin rut",
      last_names: user?.last_names ?? "sin apellidos",
      phone: user?.phone ?? "sin teléfono",
      email: user?.email,
      role: RoleMapper.validate(user?.role),
      professions: ProfessionMapper.toArray(item?.professional_profession)
    };
  }
}

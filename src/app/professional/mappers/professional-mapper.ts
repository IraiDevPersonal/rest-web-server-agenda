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
      const user = item?.user;
      const data: ProfessionalModel = {
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

      return ProfessionalSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "profession-mapper.ts: (validate)")
      );
    }
  }

  static response(data: any): ProfessionalModel[] {
    try {
      return safeArray<ProfessionalModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesionales"
      }).map(ProfessionalMapper.validate);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-mapper.ts: (response)"
      );

      throw CustomError.internalServer(errorMessage);
    }
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
}

import { type PatientModel, PatientSchema } from "../models/patient";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { Uid } from "@/lib/uid";

export class PatientMapper {
  static validate(item: any): PatientModel {
    try {
      const data = PatientMapper.mapper(item);
      return PatientSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "patient-mapper.ts: (validate)")
      );
    }
  }

  static serverResponse(item: any): PatientModel[] {
    try {
      return safeArray<PatientModel>(item, {
        throwErrors: true,
        errorMessage: "se espera un array de pacientes"
      }).map(PatientMapper.validate);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "patient-mapper.ts: (serverResponse)"
        )
      );
    }
  }

  private static mapper(item: any): PatientModel {
    return {
      id: item?.id,
      uid: item?.uid ?? Uid.createV4(),
      rut: item?.rut ?? "sin rut",
      names: item?.names ?? "sin nombres",
      last_names: item?.last_names ?? "sin apellidos",
      email: item?.email ?? "sin correo",
      phone: item?.phone ?? "sin teléfono",
      address: item?.address ?? "sin dirección",
      is_deleted: item?.is_deleted ?? false
    };
  }
}

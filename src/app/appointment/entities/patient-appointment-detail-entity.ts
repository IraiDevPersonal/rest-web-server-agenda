import { z } from "zod";

import { CustomError } from "@/lib/custom-error";

const PatientAppointmDetailEntitySchema = z.object({
  names: z.string(),
  last_names: z.string(),
  rut: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string()
});

type PatientAppointmentDetailModel = z.infer<
  typeof PatientAppointmDetailEntitySchema
>;

export class PatientAppointmentDetailEntity {
  public names: PatientAppointmentDetailModel["names"];
  public last_names: PatientAppointmentDetailModel["last_names"];
  public rut: PatientAppointmentDetailModel["rut"];
  public phone: PatientAppointmentDetailModel["phone"];
  public email: PatientAppointmentDetailModel["email"];
  public address: PatientAppointmentDetailModel["address"];

  private constructor(init: PatientAppointmentDetailModel) {
    this.names = init.names;
    this.last_names = init.last_names;
    this.rut = init.rut;
    this.phone = init.phone;
    this.email = init.email;
    this.address = init.address;
  }

  static getSchema() {
    return PatientAppointmDetailEntitySchema;
  }

  static validate(item: any): PatientAppointmentDetailModel {
    try {
      const data = PatientAppointmentDetailEntity.mapper(item);
      return PatientAppointmentDetailEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "patient-appointment-detail-entity.ts: (validate)"
        )
      );
    }
  }

  private static mapper(item: any): PatientAppointmentDetailModel {
    return {
      names: item.names ?? "sin nombres",
      last_names: item.names ?? "sin apellidos",
      rut: item.names ?? "sin rut",
      phone: item.names ?? "sin teléfono",
      email: item.names ?? "sin correo",
      address: item.names ?? "sin dirección"
    };
  }
}

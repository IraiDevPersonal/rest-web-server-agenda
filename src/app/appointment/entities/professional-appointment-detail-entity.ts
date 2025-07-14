import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

const ProfessionalAppointmentDetailSchema = z.object({
  full_name: z.string(),
  professions: z.array(z.string()),
  pay_methods: z.array(z.string()),
  confirm_methods: z.array(z.string())
});

type ProfessionalAppointmentDetailModel = z.infer<
  typeof ProfessionalAppointmentDetailSchema
>;

export class ProfessionalAppointmentDetailEntity {
  public full_name: ProfessionalAppointmentDetailModel["full_name"];
  public professions: ProfessionalAppointmentDetailModel["professions"];
  public pay_methods: ProfessionalAppointmentDetailModel["pay_methods"];
  public confirm_methods: ProfessionalAppointmentDetailModel["confirm_methods"];

  private constructor(init: ProfessionalAppointmentDetailModel) {
    this.full_name = init.full_name;
    this.professions = init.professions;
    this.pay_methods = init.pay_methods;
    this.confirm_methods = init.confirm_methods;
  }

  static getSchema() {
    return ProfessionalAppointmentDetailSchema;
  }

  static validate(item: any): ProfessionalAppointmentDetailModel {
    try {
      const data = ProfessionalAppointmentDetailEntity.mapper(item);
      return ProfessionalAppointmentDetailEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "profesional-entity.ts: (validate)")
      );
    }
  }

  private static mapper(item: any): ProfessionalAppointmentDetailModel {
    const user = item?.user;
    const professions = safeArray<any>(item?.professional_profession).map(
      (p, idx) => p?.professions?.name ?? `profession desconocida ${idx + 1}`
    );

    return {
      full_name: `${user?.names ?? "sin nombres"} ${user?.last_names ?? "sin apellidos"}`,
      professions: professions,
      pay_methods: ["fonasa", "particular (Efectivo, Transferencia)"],
      confirm_methods: ["whatsapp", "teléfono", "correo", "presencial"]
    };
  }
}

import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

import { safeArray } from "@/lib/utils";
import { DateFormatter } from "@/lib/date-formatter";
import { CustomError } from "@/lib/custom-error";

const AppointmentSchema = z.object({
  uid: z.string().uuid("El UID debe ser un UUID válido"),
  date: z.string({ message: "La fecha es obligatoria" }),
  time_from: z.string(),
  time_to: z.string(),
  patient_name: z.string(),
  patient_rut: z.string(),
  patient_phone: z.string(),
  professional_name: z.string(),
  appointment_status: z.nativeEnum(AppointmentStatus),
  professions: z.array(z.string()),
});

type AppointmentModel = z.infer<typeof AppointmentSchema>;

export class AppointmentEntity {
  public uid: AppointmentModel["uid"];
  public date: AppointmentModel["date"];
  public time_from: AppointmentModel["time_from"];
  public time_to: AppointmentModel["time_to"];
  public patient_name: AppointmentModel["patient_name"];
  public patient_rut: AppointmentModel["patient_rut"];
  public patient_phone: AppointmentModel["patient_phone"];
  public professional_name: AppointmentModel["professional_name"];
  public appointment_status: AppointmentModel["appointment_status"];
  public professions: AppointmentModel["professions"];

  private constructor(init: AppointmentModel) {
    this.uid = String(init.uid);
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.patient_name = String(init.patient_name);
    this.patient_rut = init.patient_rut;
    this.patient_phone = init.patient_phone;
    this.professional_name = String(init.professional_name);
    this.appointment_status = init.appointment_status ?? AppointmentStatus.INDETERMINATE;
    this.date = init.date ? DateFormatter.formatDate(init.date, "ymd") : "aaaa-mm-dd";
    this.professions = init.professions.map(String);
  }

  static getSchema() {
    return AppointmentSchema;
  }

  static validate(item: any): AppointmentModel {
    try {
      const data = AppointmentEntity.itemAdapter(item);
      return AppointmentEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error, "appointment-entity.ts: (validate) error inesperado"));
    }
  }

  static responseAdapter(data: any): AppointmentModel[] {
    try {
      return safeArray<AppointmentModel>(data, {
        throwErrors: true,
        errorMessage: "appointment-entity.ts: (responseAdapter) se eperaba un arreglo",
      }).map(AppointmentEntity.validate);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "appointment-entity.ts: (responseAdapter) error inesperado"));
    }
  }

  private static itemAdapter(item: any): any {
    const schedule = item?.["schedule"];
    const patient = item?.["patient"];
    const professional = schedule?.["professional"];
    const professions = safeArray<any>(professional?.["professional_profession"]);

    return new AppointmentEntity({
      uid: item?.["uid"],
      appointment_status: item?.["appointment_status"],
      time_from: schedule?.["time_from"],
      time_to: schedule?.["time_to"],
      date: schedule?.["date"],
      patient_rut: patient?.["rut"],
      patient_phone: patient?.["phone"],
      patient_name: patient?.["names"] + patient?.["last_names"],
      professional_name: professional?.["user"]?.["names"] + professional?.["user"]?.["last_names"],
      professions: professions.map(p => p?.professions?.name),
    });
  }
}

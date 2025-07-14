import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

import { safeArray } from "@/lib/utils";
import { DateFormatter } from "@/lib/date-formatter";
import { CustomError } from "@/lib/custom-error";
import { Uid } from "@/lib/uid";

const AppointmentSchema = z.object({
  uid: z.string().uuid("El UID debe ser un UUID válido"),
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  patient_name: z.string(),
  patient_rut: z.string(),
  patient_phone: z.string(),
  professional_name: z.string(),
  appointment_status: z.nativeEnum(AppointmentStatus),
  professions: z.array(z.string())
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
    this.uid = init.uid;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.patient_name = init.patient_name;
    this.patient_rut = init.patient_rut;
    this.patient_phone = init.patient_phone;
    this.professional_name = init.professional_name;
    this.appointment_status = init.appointment_status;
    this.date = init.date;
    this.professions = init.professions;
  }

  static getSchema() {
    return AppointmentSchema;
  }

  static validate(item: any): AppointmentModel {
    try {
      const data = AppointmentEntity.mapper(item);
      return AppointmentEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "appointment-entity.ts: (validate)")
      );
    }
  }

  static responseAdapter(data: any): AppointmentModel[] {
    try {
      return safeArray<AppointmentModel>(data, {
        throwErrors: true,
        errorMessage: "se eperaba un arreglo de citas"
      }).map(AppointmentEntity.validate);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "appointment-entity.ts: (responseAdapter)"
        )
      );
    }
  }

  private static mapper(item: any): AppointmentModel {
    const schedule = item?.schedule;
    const patient = item?.patient;
    const professional = schedule?.professional;
    const professions = safeArray<any>(professional?.professional_profession);

    return new AppointmentEntity({
      uid: item?.uid ?? Uid.createV4(),
      time_from: schedule?.time_from ?? "hh:mm",
      time_to: schedule?.time_to ?? "hh:mm",
      patient_rut: patient?.rut ?? "sin rut",
      patient_phone: patient?.phone ?? "sin teléfono",
      patient_name: `${patient?.names ?? "sin nombres"} ${patient?.last_names ?? "sin apellidos"}`,
      professional_name: `${professional?.user?.names ?? "sin nombres"} ${professional?.user?.last_names ?? "sin apellidos"}`,
      date: schedule?.date
        ? DateFormatter.formatDate(schedule.date, "ymd")
        : "aaaa-mm-dd",
      appointment_status:
        item?.appointment_status ?? AppointmentStatus.INDETERMINATE,
      professions: professions.map(
        (p, idx) => p?.professions?.name ?? `Profesión indeterminada ${idx + 1}`
      )
    });
  }
}

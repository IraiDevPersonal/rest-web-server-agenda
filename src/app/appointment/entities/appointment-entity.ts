import { AppointmentStatus } from "@prisma/client";

import { isValidObject, safeArray } from "@/lib/utils";
import { DateFormatter } from "@/lib/date-formatter";
import { Uid } from "@/lib/uid";

type Init = {
  uid: string;
  time_from: string;
  time_to: string;
  date: string | undefined;
  patient_name: string | undefined;
  patient_rut: string | undefined;
  patient_phone: string | undefined;
  professional_name: string | undefined;
  appointment_status: AppointmentStatus;
  professions: string[];
};

export class AppointmentEntity {
  public uid: Init["uid"];
  public date: Init["date"];
  public time_from: Init["time_from"];
  public time_to: Init["time_to"];
  public patient_name: Init["patient_name"];
  public patient_rut: Init["patient_rut"];
  public patient_phone: Init["patient_phone"];
  public professional_name: Init["professional_name"];
  public appointment_status: Init["appointment_status"];
  public professions: Init["professions"];

  private constructor(init: Init) {
    this.uid = init.uid;
    this.date = init.date;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.patient_name = init.patient_name;
    this.patient_rut = init.patient_rut;
    this.patient_phone = init.patient_phone;
    this.professional_name = init.professional_name;
    this.professions = init.professions;
    this.appointment_status = init.appointment_status;
  }

  static responseAdapter(data: any): AppointmentEntity[] {
    try {
      return safeArray<AppointmentEntity>(data).map(AppointmentEntity.itemAdapter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("appointment-entity.ts: (responseAdapter) error inesperado");
    }
  }

  private static itemAdapter(item: any): AppointmentEntity {
    const message = "appointment-entity.ts: (itemAdapter) entreada no esperada, se esperaba un objeto"

    if (!isValidObject(item, message)) {
      throw new Error(message);
    }

    const schedule = item["schedule"];
    const patient = item["patient"];
    const professional = schedule?.["professional"];
    const professions = professional?.["professional_profession"];

    const defaultAppointment: Init = {
      uid: Uid.createV4(),
      date: "aaaa-mm-dd",
      time_from: "hh:mm",
      time_to: "hh:mm",
      patient_name: "Sin nombre...",
      patient_rut: "Sin rut",
      patient_phone: "Sin teléfono...",
      professional_name: "Sin nombre...",
      appointment_status: AppointmentStatus.INDETERMINATE,
      professions: [],
    }

    const appointment: Init = {
      uid: item["uid"],
      appointment_status: item["appointment_status"],
      time_from: schedule?.["time_from"],
      time_to: schedule?.["time_to"],
      patient_rut: patient?.["rut"],
      patient_phone: patient?.["phone"],
      date: schedule?.["date"] ? DateFormatter.formatDate(schedule["date"], "ymd") : undefined,
      professional_name: professional ? `${professional["user"]["names"]} ${professional["user"]["last_names"]}` : undefined,
      patient_name: patient
        ? `${patient["names"]} ${patient["last_names"]}`
        : undefined,
      professions: professions.map((p: any) => p?.professions?.name ?? "profesión indeterminada...")
    };

    return new AppointmentEntity({
      ...defaultAppointment,
      ...appointment,
    })
  }
}

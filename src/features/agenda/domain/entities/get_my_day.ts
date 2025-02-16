import { DateFormatter } from "@core/domain/date_formatter";
import { AppointmentStatus } from "@prisma/client";

type Init = {
  uid: string;
  date: string;
  time_from: string;
  time_to: string;
  patient_name: string | null;
  patient_rut: string | null;
  patient_phone: string | null;
  professional_name: string;
  appointment_status: AppointmentStatus;
  professions: string[];
};
export class GetMyDay {
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

  static fromObject(object: Record<string, any>) {
    const appointment = GetMyDay.adapter(object);
    return new GetMyDay(appointment);
  }

  static adapter(appointment: Record<string, any>): Init {
    const schedule = appointment["schedule"];
    const patient = appointment?.["patient"] ?? null;
    const professional = schedule["professional"];

    return {
      uid: appointment["uid"],
      appointment_status: appointment["appointment_status"],
      date: DateFormatter.formatDate(schedule["date"], "ymd"),
      time_from: schedule["time_from"],
      time_to: schedule["time_to"],
      patient_name: patient
        ? `${patient["names"]} ${patient["last_names"]}`
        : null,
      patient_rut: patient?.["rut"] ?? null,
      patient_phone: patient?.["phone"] ?? null,
      professional_name: `${professional["user"]["names"]} ${professional["user"]["last_names"]}`,
      professions: professional["professions"]?.map((p: any) => p.name) ?? [],
    };
  }
}

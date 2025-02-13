import { DateFormatter } from "@core/domain/date_formatter";
import { AppointmentStatus } from "@prisma/client";

type Init = {
  uid: string;
  date: string;
  time_from: string;
  time_to: string;
  patient_name: string | undefined;
  patient_rut: string | undefined;
  patient_phone: string | undefined;
  professional_name: string;
  appointment_status: AppointmentStatus;
  professions: string[];
};
export class GetMyDay {
  public uid: string;
  public date: string;
  public time_from: string;
  public time_to: string;
  public patient_name: string | undefined;
  public patient_rut: string | undefined;
  public patient_phone: string | undefined;
  public professional_name: string;
  public appointment_status: AppointmentStatus;
  public professions: string[];

  public constructor(init: Init) {
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

  static fromJson(object: Record<string, any>): GetMyDay {
    return new GetMyDay(GetMyDay.adapter(object) as Init);
  }

  static adapter(object: Record<string, any>): Record<string, any> {
    // console.log(object);
    return {
      uid: object["uid"],
      appointment_status: object["appointment_status"],
      date: DateFormatter.formatDate(object["schedule"]["date"], "ymd"),
      time_from: object["schedule"]["time_from"],
      time_to: object["schedule"]["time_to"],
      patient_name: object?.["patient"]
        ? `${object["patient"]["names"]} ${object["patient"]["last_names"]} `
        : null,
      patient_rut: object?.["patient"]?.["rut"] ?? null,
      patient_phone: object?.["patient"]?.["phone"] ?? null,
      professional_name:
        object["schedule"]["professional"]["user"]["professional_name"],
      professions:
        object?.["schedule"]?.["professional"]["professions"]?.map(
          (p: any) => p.name
        ) ?? [],
    };
  }
}

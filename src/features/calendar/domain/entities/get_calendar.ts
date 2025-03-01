import { DateFormatter } from "@core/domain/date_formatter";

type Init = {
  professional_name: string;
  date: string;
  appointments: AppointmentCalendar[];
};

type AppointmentCalendar = {
  uid: string;
  pattient_name: string;
  patient_rut: string;
  appointment_time_to: string;
  appointment_time_from: string;
  appointment_time: string;
};

export class GetCalendar {
  public professional_name: string;
  public date: string;
  public appointments: AppointmentCalendar[];

  private constructor(init: Init) {
    this.professional_name = init.professional_name;
    this.date = init.date;
    this.appointments = init.appointments;
  }

  static fromObject(object: Record<string, any>) {
    const calendar = GetCalendar.adapter(object);
    return new GetCalendar(calendar);
  }

  static adapter(object: Record<string, any>) {
    const appointments = object?.["appointments"] ?? [];
    const professional = object?.["professional"];

    return {
      professional_name: professional
        ? `${professional["user"]["names"]} ${professional["user"]["last_names"]}`
        : "",
      date: DateFormatter.formatDate(object["date"], "ymd"),
      appointments: appointments.map((appointment: any) => ({
        uid: appointment["uid"],
        pattient_name: appointment["patient"]
          ? `${appointment["patient"]["names"]} ${appointment["patient"]["last_names"]}`
          : "",
        patient_rut: appointment["patient"]
          ? appointment["patient"]["rut"]
          : "",
        appointment_time_to: object["time_to"],
        appointment_time_from: object["time_from"],
        appointment_time: `${object["time_from"]} - ${object["time_to"]}`,
      })),
    };
  }
}

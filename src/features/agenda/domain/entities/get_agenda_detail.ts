import { DateFormatter } from "@core/domain/date_formatter";
import { AppointmentStatus } from "@prisma/client";

type PatientHistory = {
  date_time: Date;
  status: AppointmentStatus;
};
type Init = {
  professional: {
    full_name: string;
    profession: string;
    pay_method: string[];
    confirm_method: string[];
  };
  patient: {
    full_name: string;
    rut: string;
    phone: string;
    email: string;
  };
  alert: {
    message: string;
    type: string;
  };
  patient_history: PatientHistory[];
};

export class GetAgendaDetail {
  public professional;
  public patient;
  public alert;
  public patient_history;

  private constructor(init: Init) {
    this.professional = init.professional;
    this.patient = init.patient;
    this.alert = init.alert;
    this.patient_history = init.patient_history;
  }

  static fromObject(object: Record<string, any>) {
    const agenda = GetAgendaDetail.adapter(object);
    return new GetAgendaDetail(agenda);
  }

  static adapter(object: Record<string, any>) {
    const professional = object["schedule"]["professional"];
    const patient = object["patient"];

    const story: PatientHistory[] = [
      {
        date_time: DateFormatter.stringToDate("2025-01-01 15:30:20"),
        status: AppointmentStatus.CONFIRMED,
      },
      {
        date_time: DateFormatter.stringToDate("2024-12-31 23:30:20"),
        status: AppointmentStatus.CANCELLED,
      },
    ];

    return {
      professional: {
        full_name: `${professional?.["user"]["names"]} ${professional?.["user"]["last_names"]}`,
        profession: professional?.["professional_profession"]["professions"],
        pay_method: ["efectivo", "transbank"],
        confirm_method: ["whatsapp", "telefono", "correo"],
      },
      patient: {
        full_name: `${patient?.["names"] ?? ""} ${
          patient?.["last_names"] ?? ""
        }`,
        rut: patient?.["rut"] ?? "--",
        phone: patient?.["phone"] ?? "--",
        email: patient?.["email"] ?? "--",
      },
      alert: {
        message: "Profesional exige bono para confirmar paciente",
        type: "require",
      },
      patient_history: story,
    };
  }
}

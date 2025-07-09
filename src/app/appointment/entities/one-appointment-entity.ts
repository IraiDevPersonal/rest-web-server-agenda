import { CustomError } from "@/lib/custom-error";
import { isValidObject } from "@/lib/utils";
import { DateFormatter } from "@core/domain/date_formatter";
import { AppointmentStatus } from "@prisma/client";

type PatientHistory = {
  date_time: string;
  status: AppointmentStatus;
};
type Init = {
  date: string;
  time_from: string;
  time_to: string;
  status: AppointmentStatus;
  is_enabled: boolean;
  professional: {
    fullname: string;
    professions: string[];
    pay_methods: string[];
    confirm_methods: string[];
  };
  patient: {
    names: string;
    lastnames: string;
    rut: string;
    phone: string;
    email: string;
    address: string;
  };
  alert: {
    message: string;
    is_required: boolean
  };
  patient_history: PatientHistory[];
};

export class OneAppointmentEntity {
  public professional;
  public patient;
  public alert;
  public patient_history;
  public date;
  public time_from;
  public time_to;
  public status;
  public is_enabled;

  private constructor(init: Init) {
    this.professional = init.professional;
    this.patient = init.patient;
    this.alert = init.alert;
    this.patient_history = init.patient_history;
    this.date = init.date;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.status = init.status;
    this.is_enabled = init.is_enabled;
  }

  static responseAdapter(object: any): OneAppointmentEntity {
    const message = "one-appointment-entity.ts: (itemAdapter) entreada no esperada, se esperaba un objeto"

    if (!isValidObject(object, message)) {
      throw new Error(message);
    }

    const appointment = OneAppointmentEntity.itemAdapter(object);
    return new OneAppointmentEntity(appointment);
  }

  private static itemAdapter(item: Record<string, any>): Init {
    const schedule = item["schedule"];
    const professional = schedule?.["professional"];
    const patient = item["patient"];
    const patienHistory: any[] = patient?.appointments ?? [];
    const professions: any[] = professional?.["professional_profession"] ?? [];

    const history: PatientHistory[] = patienHistory.map((appointment: any) => {
      const schedule = appointment["schedule"]

      return {
        date_time: `${DateFormatter.formatDate(schedule["date"], "dmy")} ${schedule["time_from"]}-${schedule["time_to"]}`,
        status: appointment.appointment_status ?? "INDETERMINATE"
      } satisfies PatientHistory
    })

    return {
      date: schedule?.["date"] ? DateFormatter.formatDate(schedule["date"], "ymd") : "aaaa-mm-dd",
      time_from: schedule?.["time_from"] ?? "hh:mm",
      time_to: schedule?.["time_to"] ?? "hh:mm",
      status: item["appointment_status"] ?? "INDETERMINATE",
      is_enabled: schedule?.["is_enabled"] ?? false,
      professional: {
        fullname: `${professional?.["user"]["names"] ?? "sin nombres"} ${professional?.["user"]["last_names"] ?? "sin apellidos"}`,
        professions: professions.map((p) => p?.professions?.name ?? "profesión indeterminada..."),
        pay_methods: ["fonasa", "particular (Efectivo, Transferencia)"],
        confirm_methods: ["whatsapp", "teléfono", "correo", "presencial"],
      },
      patient: {
        names: professional?.["user"]["names"] ?? "Paciente sin nombres",
        lastnames: professional?.["user"]["last_names"] ?? "Paciente sin apellidos",
        rut: patient?.["rut"] ?? "Paciente sin rut",
        phone: patient?.["phone"] ?? "Paciente sin teléfono",
        email: patient?.["email"] ?? "Paciente sin correo",
        address: patient?.["address"] ?? "Paciente sin dirección",
      },
      patient_history: history,
      alert: {
        message: "Profesional exige bono para confirmar paciente",
        is_required: true
      },
    } satisfies OneAppointmentEntity;
  }
}

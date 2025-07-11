import { CustomError } from "@/lib/custom-error";
import { isValidObject, safeArray } from "@/lib/utils";
import { DateFormatter } from "@core/domain/date_formatter";
import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

const OneAppointmentSchema = z.object(
  {
    uid: z.string().uuid("El UID debe ser un UUID válido"),
    date: z.string(),
    time_from: z.string(),
    time_to: z.string(),
    status: z.nativeEnum(AppointmentStatus),
    is_enabled: z.boolean(),
    professional: z.object({
      full_name: z.string(),
      professions: z.array(z.string()),
      pay_methods: z.array(z.string()),
      confirm_methods: z.array(z.string()),
    }),
    patient: z.object({
      names: z.string(),
      last_names: z.string(),
      rut: z.string(),
      phone: z.string(),
      email: z.string(),
      address: z.string(),
    }),
    alert: z.object({
      message: z.string(),
      is_required: z.boolean()
    }),
    patient_history: z.array(z.object({
      date_time: z.string(),
      status: z.nativeEnum(AppointmentStatus),
    }))
  }
)

type OneAppointmentModel = z.infer<typeof OneAppointmentSchema>;

export class OneAppointmentEntity {
  public professional: OneAppointmentModel["professional"];
  public patient: OneAppointmentModel["patient"];
  public alert: OneAppointmentModel["alert"];
  public patient_history: OneAppointmentModel["patient_history"];
  public uid: OneAppointmentModel["uid"];
  public date: OneAppointmentModel["date"];
  public time_from: OneAppointmentModel["time_from"];
  public time_to: OneAppointmentModel["time_to"];
  public status: OneAppointmentModel["status"];
  public is_enabled: OneAppointmentModel["is_enabled"];

  private constructor(init: OneAppointmentModel) {
    this.professional = {
      full_name: String(init.professional.full_name),
      professions: init.professional.professions.map(String),
      pay_methods: init.professional.pay_methods,
      confirm_methods: init.professional.confirm_methods,
    };
    this.patient = {
      names: init.patient.names,
      last_names: init.patient.last_names,
      rut: init.patient.rut,
      phone: init.patient.phone,
      email: init.patient.email,
      address: init.patient.address,
    };
    this.alert = init.alert //TODO: revisar cuando se maneje a traves de bd;
    this.patient_history = init.patient_history.map((history) => ({
      date_time: String(history.date_time),
      status: history.status,
    }));
    this.uid = init.uid;
    this.date = init.date;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.status = init.status ?? AppointmentStatus.INDETERMINATE;
    this.is_enabled = init.is_enabled ?? false;
  }

  static getSchema() {
    return OneAppointmentSchema;
  }

  static responseAdapter(object: any): OneAppointmentEntity {
    return OneAppointmentEntity.validate(object);
  }

  static validate(item: any): OneAppointmentModel {
    try {
      const data = OneAppointmentEntity.itemAdapter(item);
      return OneAppointmentEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "one-appointment-entity.ts: (validate) error inesperado")
      )
    }
  }

  private static itemAdapter(item: any): OneAppointmentEntity {
    const schedule = item.schedule;
    const patient = item.patient;
    const professional = schedule?.professional;
    const professions = safeArray<any>(professional?.professional_profession).map(p => p?.professions?.name);
    const patienHistory = safeArray<any>(patient?.appointments).map((p) => ({
      date_time: (p?.schedule?.date ? DateFormatter.formatDate(p.schedule.date, "dmy") : "aaaa-mm-dd") + " " + p?.schedule?.time_from + "-" + p?.schedule?.time_to,
      status: p?.appointment_statuss ?? AppointmentStatus.INDETERMINATE,
    }));

    return new OneAppointmentEntity({
      uid: item["uid"],
      date: schedule?.["date"] ? DateFormatter.formatDate(schedule["date"], "ymd") : "aaaa-mm-dd",
      time_from: schedule?.["time_from"],
      time_to: schedule?.["time_to"],
      status: item["appointment_status"],
      is_enabled: schedule?.["is_enabled"],
      professional: {
        full_name: professional?.["user"]?.["names"] + professional?.["user"]?.["last_names"],
        professions: professions,
        pay_methods: ["fonasa", "particular (Efectivo, Transferencia)"],
        confirm_methods: ["whatsapp", "teléfono", "correo", "presencial"],
      },
      patient: patient,
      patient_history: patienHistory,
      alert: {
        message: "Profesional exige bono para confirmar paciente",
        is_required: true
      },
    });
  }
}

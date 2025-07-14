import { DateFormatter } from '@core/domain/date_formatter';
import { AppointmentStatus } from '@prisma/client';

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
    full_name: string;
    professions: string[];
    pay_methods: string[];
    confirm_methods: string[];
  };
  patient: {
    names: string;
    last_names: string;
    rut: string;
    phone: string;
    email: string;
    address: string;
  };
  alert: {
    message: string;
    is_required: boolean;
  };
  patient_history: PatientHistory[];
};

export class GetAgendaDetail {
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

  static fromObject(object: Record<string, any>) {
    const agenda = GetAgendaDetail.adapter(object);
    return new GetAgendaDetail(agenda);
  }

  static adapter(object: Record<string, any>) {
    const schedule = object['schedule'];
    const professional = schedule?.['professional'];
    const patient = object['patient'];
    const patienHistory: any[] = patient?.appointments ?? [];
    const professions: any[] = professional?.['professional_profession'] ?? [];

    const history: PatientHistory[] = patienHistory.map((appointment: any) => {
      const schedule = appointment['schedule'];

      return {
        date_time: `${DateFormatter.formatDate(schedule['date'], 'dmy')} ${schedule['time_from']}-${schedule['time_to']}`,
        status: appointment.appointment_status ?? 'INDETERMINATE'
      } satisfies PatientHistory;
    });

    return {
      date: DateFormatter.formatDate(schedule['date'], 'ymd'),
      time_from: schedule['time_from'],
      time_to: schedule['time_to'],
      status: object['appointment_status'] ?? 'INDETERMINATE',
      is_enabled: schedule['is_enabled'],
      professional: {
        full_name: `${professional?.['user']['names'] ?? 'Profesional sin nombres'} ${professional?.['user']['last_names'] ?? 'Profesional sin apellidos'}`,
        professions: professions.map((p) => p.professions.name),
        pay_methods: ['fonasa', 'particular (Efectivo, Transferencia)'],
        confirm_methods: ['whatsapp', 'teléfono', 'correo', 'presencial']
      },
      patient: {
        names: professional?.['user']['names'] ?? 'Paciente sin nombres',
        last_names:
          professional?.['user']['last_names'] ?? 'Paciente sin apellidos',
        rut: patient?.['rut'] ?? 'Paciente sin rut',
        phone: patient?.['phone'] ?? 'Paciente sin teléfono',
        email: patient?.['email'] ?? 'Paciente sin correo',
        address: patient?.['address'] ?? 'Paciente sin dirección'
      },
      patient_history: history,
      alert: {
        message: 'Profesional exige bono para confirmar paciente',
        is_required: true
      }
    } satisfies GetAgendaDetail;
  }
}

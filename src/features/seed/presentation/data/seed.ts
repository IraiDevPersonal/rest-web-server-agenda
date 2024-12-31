import { AppointmentStatusModel } from "../../../appointment-status/domain/model/appointment-status_model";
import { AppointmentModel } from "../../../appointment/domain/model/appointment_model";
import { PatientEntity } from "../../../patients/domain/entities/patient_entity";
import { RoleModel } from "../../../roles/domain/entities/role_entity";
import { ScheduleModel } from "../../../schedule/domain/entities/schedule_entity";
import { UserEntity } from "../../../users/domain/entities/user_entity";

export const roles: Pick<RoleModel, "name">[] = [
  { name: "admin" },
  { name: "professional" },
];

export const appointmentsStatus: Pick<AppointmentStatusModel, "name">[] = [
  { name: "para confirmar" },
  { name: "confirmado" },
  { name: "cancelado" },
];

export const patients: Omit<PatientEntity, "id" | "uid">[] = [
  {
    email: "cosme_fulano_1@gmail.com",
    last_names: "fulano 1",
    names: "cosme 1",
    phone: "+56911111111",
    rut: "18.805.186-3",
  },
  {
    email: "cosme_fulano_2@gmail.com",
    last_names: "fulano 2",
    names: "cosme 2",
    phone: "+56922222222",
    rut: "3.560.077-9",
  },
  {
    email: "cosme_fulano_3@gmail.com",
    last_names: "fulano 3",
    names: "cosme 3",
    phone: "+56933333333",
    rut: "12.109.544-0",
  },
  {
    email: "cosme_fulano_4@gmail.com",
    last_names: "fulano 4",
    names: "cosme 4",
    phone: "+569444444444",
    rut: "11.111.111-1",
  },
  {
    email: "cosme_fulano_5@gmail.com",
    last_names: "fulano 5",
    names: "cosme 5",
    phone: "+569555555555",
    rut: "15.9533.693-9",
  },
];

export const users: Omit<UserEntity, "id" | "uid" | "role">[] = [
  {
    email: "pinilla.sebastianm@gmail.com",
    password: "123456",
    role_id: 1,
    is_admin: true,
    last_names: "acuña pinilla",
    names: "sebastian matias",
    phone: "+56948426521",
    rut: "18.804.066-7",
  },
  {
    email: "raul.espmol@gmail.com",
    password: "123456",
    role_id: 2,
    is_admin: true,
    last_names: "espinoza molina",
    names: "raul ignacio",
    phone: "+56948426521",
    rut: "19.051.146-7",
  },
  {
    email: "iraidev@gmail.com",
    password: "123456",
    role_id: 1,
    is_admin: true,
    last_names: "arriagada iriarte",
    names: "ignacio rodrigo",
    phone: "+56948426521",
    rut: "19.050.844-7",
  },
];

export const schedules: Omit<ScheduleModel, "id" | "professional">[] = [
  {
    professional_id: 1,
    week_day: "LUNES",
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
  },
  {
    professional_id: 1,
    week_day: "LUNES",
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
  },
  {
    professional_id: 1,
    week_day: "LUNES",
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
  },
  {
    professional_id: 1,
    week_day: "MIERCOLES",
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
  },
  {
    professional_id: 1,
    week_day: "MIERCOLES",
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
  },
  {
    professional_id: 1,
    week_day: "MIERCOLES",
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
  },
  {
    professional_id: 1,
    week_day: "VIERNES",
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
  },
  {
    professional_id: 1,
    week_day: "VIERNES",
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
  },
  {
    professional_id: 1,
    week_day: "VIERNES",
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
  },

  {
    professional_id: 2,
    week_day: "MARTES",
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
  },
  {
    professional_id: 2,
    week_day: "MARTES",
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
  },
  {
    professional_id: 2,
    week_day: "MARTES",
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
  },
  {
    professional_id: 2,
    week_day: "JUEVES",
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
  },
  {
    professional_id: 2,
    week_day: "JUEVES",
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
  },
  {
    professional_id: 2,
    week_day: "JUEVES",
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
  },
  {
    professional_id: 2,
    week_day: "SABADO",
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
  },
  {
    professional_id: 2,
    week_day: "SABADO",
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
  },
  {
    professional_id: 2,
    week_day: "SABADO",
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
  },
  {
    professional_id: 3,
    week_day: "LUNES",
    time_from: "10:00",
    time_to: "10:45",
    is_enabled: true,
  },
  {
    professional_id: 3,
    week_day: "LUNES",
    time_from: "12:00",
    time_to: "12:45",
    is_enabled: true,
  },
  {
    professional_id: 3,
    week_day: "LUNES",
    time_from: "14:00",
    time_to: "14:45",
    is_enabled: false,
  },
  {
    professional_id: 3,
    week_day: "MIERCOLES",
    time_from: "09:00",
    time_to: "09:15",
    is_enabled: true,
  },
  {
    professional_id: 3,
    week_day: "MIERCOLES",
    time_from: "09:30",
    time_to: "09:45",
    is_enabled: true,
  },
  {
    professional_id: 3,
    week_day: "MIERCOLES",
    time_from: "12:00",
    time_to: "12:15",
    is_enabled: false,
  },
  {
    professional_id: 3,
    week_day: "VIERNES",
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
  },
  {
    professional_id: 3,
    week_day: "VIERNES",
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
  },
  {
    professional_id: 3,
    week_day: "VIERNES",
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
  },
];

export const appointment: Omit<
  AppointmentModel,
  "id" | "patient" | "schedule" | "appointmentStatus"
>[] = [
  {
    patient_id: 1,
    schedule_id: 1,
    appointment_status_id: 1,
  },
  {
    patient_id: 1,
    schedule_id: 5,
    appointment_status_id: 2,
  },
  {
    patient_id: 1,
    schedule_id: 6,
    appointment_status_id: 3,
  },
  {
    patient_id: 2,
    schedule_id: 8,
    appointment_status_id: 1,
  },
  {
    patient_id: 2,
    schedule_id: 2,
    appointment_status_id: 2,
  },
  {
    patient_id: 2,
    schedule_id: 14,
    appointment_status_id: 3,
  },
  {
    patient_id: 3,
    schedule_id: 9,
    appointment_status_id: 1,
  },
  {
    patient_id: 3,
    schedule_id: 10,
    appointment_status_id: 2,
  },
  {
    patient_id: 3,
    schedule_id: 11,
    appointment_status_id: 3,
  },
  {
    patient_id: 4,
    schedule_id: 12,
    appointment_status_id: 1,
  },
  {
    patient_id: 4,
    schedule_id: 13,
    appointment_status_id: 2,
  },
  {
    patient_id: 4,
    schedule_id: 15,
    appointment_status_id: 3,
  },
  {
    patient_id: 5,
    schedule_id: 16,
    appointment_status_id: 1,
  },
  {
    patient_id: 5,
    schedule_id: 17,
    appointment_status_id: 2,
  },
  {
    patient_id: 5,
    schedule_id: 18,
    appointment_status_id: 3,
  },
];

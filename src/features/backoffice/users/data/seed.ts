import { OldAppointmentMapper } from "@appointments/domain/mappers/appointment_Mapper";
import { PatientMapper } from "@patients/domain/mappers/patient_Mapper";
import { ProfessionMapper } from "@professions/domain/mappers/profession_Mapper";
import { ProfessionalMapper } from "@professionals/domain/mappers/professional_Mapper";
import { RoleMapper } from "@roles/domain/mappers/role_Mapper";
import { ScheduleMapper } from "@schedules/domain/mappers/schedule_Mapper";
import { ServiceProviderMapper } from "@serviceProviders/domain/mappers/serviceProvider_Mapper";
import { ServiceProviderCodesMapper } from "@serviceProviders/domain/mappers/serviceProviderCodes_Mapper";
import { UserMapper } from "@users/domain/mappers/user_Mapper";
import { ProfessionalProfession } from "@professionals/domain/mappers/professionalProfession_Mapper";
import { v4 } from "uuid";
import { AppointmentStatus, WeekDay } from "@prisma/client";

export const professions: ProfessionMapper[] = [
  ProfessionMapper.fromJson({
    name: "Psicologia"
  }),
  ProfessionMapper.fromJson({
    name: "Dentista"
  })
];

export const serviceProvider: ServiceProviderMapper[] = [
  ServiceProviderMapper.fromJson({
    name: "Primero llamado",
    rut: "12.109.544-0",
    serviceProviderCode: [
      {
        title: "Codigo 1",
        code: "1231241231"
      },
      {
        title: "Codigo 2",
        code: "123124123112312"
      }
    ] as ServiceProviderCodesMapper[]
  })
];

export const professionalProfession: ProfessionalProfession[] = [
  { professionalId: 1, professionId: 1 },
  { professionalId: 2, professionId: 2 }
];

export const roles: RoleMapper[] = [
  RoleMapper.fromJson({ name: "admin" }),
  RoleMapper.fromJson({ name: "professional" })
];

export const patients: PatientMapper[] = [
  PatientMapper.fromJson({
    email: "cosme_fulano_1@gmail.com",
    last_names: "fulano 1",
    names: "cosme 1",
    phone: "+56911111111",
    rut: "18.805.186-3",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
  PatientMapper.fromJson({
    email: "cosme_fulano_2@gmail.com",
    last_names: "fulano 2",
    names: "cosme 2",
    phone: "+56922222222",
    rut: "3.560.077-9",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
  PatientMapper.fromJson({
    email: "cosme_fulano_3@gmail.com",
    last_names: "fulano 3",
    names: "cosme 3",
    phone: "+56933333333",
    rut: "12.109.544-0",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
  PatientMapper.fromJson({
    email: "cosme_fulano_4@gmail.com",
    last_names: "fulano 4",
    names: "cosme 4",
    phone: "+569444444444",
    rut: "11.111.111-1",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
  PatientMapper.fromJson({
    email: "cosme_fulano_5@gmail.com",
    last_names: "fulano 5",
    names: "cosme 5",
    phone: "+569555555555",
    rut: "15.953.693-9",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  })
];

export const users: UserMapper[] = [
  UserMapper.fromJson({
    email: "pinilla.sebastianm@gmail.com",
    password: "123456",
    role_id: 1,
    is_admin: true,
    last_names: "acuña pinilla",
    names: "sebastian matias",
    phone: "+56948426521",
    rut: "18.804.066-7"
  }),
  UserMapper.fromJson({
    email: "raul.espmol@gmail.com",
    password: "123456",
    role_id: 2,
    is_admin: true,
    last_names: "espinoza molina",
    names: "raul ignacio",
    phone: "+56948426521",
    rut: "19.051.146-7"
  }),
  UserMapper.fromJson({
    email: "iraidev@gmail.com",
    password: "123456",
    role_id: 1,
    is_admin: true,
    last_names: "arriagada iriarte",
    names: "ignacio rodrigo",
    phone: "+56948426521",
    rut: "19.050.844-7"
  })
];

export const professionals: ProfessionalMapper[] = [
  ProfessionalMapper.fromJson({
    userId: 1,
    serviceProviderId: 1
  }),
  ProfessionalMapper.fromJson({
    userId: 2
  })
];

export const schedules: ScheduleMapper[] = [
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false
    },
    "insert"
  ),

  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "10:00",
      time_to: "10:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "12:00",
      time_to: "12:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "14:00",
      time_to: "14:45",
      is_enabled: false
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "09:00",
      time_to: "09:15",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "09:30",
      time_to: "09:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "12:00",
      time_to: "12:15",
      is_enabled: false
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true
    },
    "insert"
  ),
  ScheduleMapper.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false
    },
    "insert"
  )
];

export const appointment: OldAppointmentMapper[] = [
  OldAppointmentMapper.createDTO({
    patient_id: 1,
    schedule_id: 1,
    appointment_status: AppointmentStatus.AVAILABLE
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 1,
    schedule_id: 5,
    appointment_status: AppointmentStatus.CONFIRMED
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 1,
    schedule_id: 6,
    appointment_status: AppointmentStatus.TO_CONFIRM
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 2,
    schedule_id: 8,
    appointment_status: AppointmentStatus.TO_CONFIRM
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 2,
    schedule_id: 2,
    appointment_status: AppointmentStatus.CONFIRMED
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 2,
    schedule_id: 14,
    appointment_status: AppointmentStatus.TO_CONFIRM
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 3,
    schedule_id: 9,
    appointment_status: AppointmentStatus.CANCELLED
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 3,
    schedule_id: 10,
    appointment_status: AppointmentStatus.TO_CONFIRM
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 3,
    schedule_id: 11,
    appointment_status: AppointmentStatus.CONFIRMED
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 4,
    schedule_id: 12,
    appointment_status: AppointmentStatus.CONFIRMED
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 4,
    schedule_id: 13,
    appointment_status: AppointmentStatus.TO_CONFIRM
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 4,
    schedule_id: 15,
    appointment_status: AppointmentStatus.TO_CONFIRM
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 5,
    schedule_id: 16,
    appointment_status: AppointmentStatus.CANCELLED
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 5,
    schedule_id: 17,
    appointment_status: AppointmentStatus.TO_CONFIRM
  }),
  OldAppointmentMapper.createDTO({
    patient_id: 5,
    schedule_id: 18,
    appointment_status: AppointmentStatus.CANCELLED
  })
];

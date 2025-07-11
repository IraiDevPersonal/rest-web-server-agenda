import { AppointmentEntity } from "@appointments/domain/entities/appointment_entity";
import { PatientEntity } from "@patients/domain/entities/patient_entity";
import { ProfessionEntity } from "@professions/domain/entities/profession_entity";
import { ProfessionalEntity } from "@professionals/domain/entities/professional_entity";
import { RoleEntity } from "@roles/domain/entities/role_entity";
import { ScheduleEntity } from "@schedules/domain/entities/schedule_entity";
import { ServiceProviderEntity } from "@serviceProviders/domain/entities/serviceProvider_entity";
import { ServiceProviderCodesEntity } from "@serviceProviders/domain/entities/serviceProviderCodes_entity";
import { UserEntity } from "@users/domain/entities/user_entity";
import { ProfessionalProfession } from "@professionals/domain/entities/professionalProfession_entity";
import { v4 } from "uuid";
import { AppointmentStatus, WeekDay } from "@prisma/client";

export const professions: ProfessionEntity[] = [
  ProfessionEntity.fromJson({
    name: "Psicologia",
  }),
  ProfessionEntity.fromJson({
    name: "Dentista",
  }),
];

export const serviceProvider: ServiceProviderEntity[] = [
  ServiceProviderEntity.fromJson({
    name: "Primero llamado",
    rut: "12.109.544-0",
    serviceProviderCode: [
      {
        title: "Codigo 1",
        code: "1231241231",
      },
      {
        title: "Codigo 2",
        code: "123124123112312",
      },
    ] as ServiceProviderCodesEntity[],
  }),
];

export const professionalProfession: ProfessionalProfession[] = [
  { professionalId: 1, professionId: 1 },
  { professionalId: 2, professionId: 2 },
];

export const roles: RoleEntity[] = [
  RoleEntity.fromJson({ name: "admin" }),
  RoleEntity.fromJson({ name: "professional" }),
];

export const patients: PatientEntity[] = [
  PatientEntity.fromJson({
    email: "cosme_fulano_1@gmail.com",
    last_names: "fulano 1",
    names: "cosme 1",
    phone: "+56911111111",
    rut: "18.805.186-3",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
  PatientEntity.fromJson({
    email: "cosme_fulano_2@gmail.com",
    last_names: "fulano 2",
    names: "cosme 2",
    phone: "+56922222222",
    rut: "3.560.077-9",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
  PatientEntity.fromJson({
    email: "cosme_fulano_3@gmail.com",
    last_names: "fulano 3",
    names: "cosme 3",
    phone: "+56933333333",
    rut: "12.109.544-0",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
  PatientEntity.fromJson({
    email: "cosme_fulano_4@gmail.com",
    last_names: "fulano 4",
    names: "cosme 4",
    phone: "+569444444444",
    rut: "11.111.111-1",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
  PatientEntity.fromJson({
    email: "cosme_fulano_5@gmail.com",
    last_names: "fulano 5",
    names: "cosme 5",
    phone: "+569555555555",
    rut: "15.953.693-9",
    address: "calle falsa 123",
    is_deleted: false,
    uid: v4()
  }),
];

export const users: UserEntity[] = [
  UserEntity.fromJson({
    email: "pinilla.sebastianm@gmail.com",
    password: "123456",
    role_id: 1,
    is_admin: true,
    last_names: "acuña pinilla",
    names: "sebastian matias",
    phone: "+56948426521",
    rut: "18.804.066-7",
  }),
  UserEntity.fromJson({
    email: "raul.espmol@gmail.com",
    password: "123456",
    role_id: 2,
    is_admin: true,
    last_names: "espinoza molina",
    names: "raul ignacio",
    phone: "+56948426521",
    rut: "19.051.146-7",
  }),
  UserEntity.fromJson({
    email: "iraidev@gmail.com",
    password: "123456",
    role_id: 1,
    is_admin: true,
    last_names: "arriagada iriarte",
    names: "ignacio rodrigo",
    phone: "+56948426521",
    rut: "19.050.844-7",
  }),
];

export const professionals: ProfessionalEntity[] = [
  ProfessionalEntity.fromJson({
    userId: 1,
    serviceProviderId: 1,
  }),
  ProfessionalEntity.fromJson({
    userId: 2,
  }),
];

export const schedules: ScheduleEntity[] = [
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 1,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false,
    },
    "insert"
  ),

  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "10:00",
      time_to: "10:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "12:00",
      time_to: "12:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "14:00",
      time_to: "14:45",
      is_enabled: false,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "09:00",
      time_to: "09:15",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "09:30",
      time_to: "09:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "12:00",
      time_to: "12:15",
      is_enabled: false,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "08:00",
      time_to: "08:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "15:00",
      time_to: "15:45",
      is_enabled: true,
    },
    "insert"
  ),
  ScheduleEntity.scheduleDTO(
    {
      date: new Date(),
      professional_id: 2,
      time_from: "16:00",
      time_to: "16:45",
      is_enabled: false,
    },
    "insert"
  ),
];

export const appointment: AppointmentEntity[] = [
  AppointmentEntity.createDTO({
    patient_id: 1,
    schedule_id: 1,
    appointment_status: AppointmentStatus.AVAILABLE,
  }),
  AppointmentEntity.createDTO({
    patient_id: 1,
    schedule_id: 5,
    appointment_status: AppointmentStatus.CONFIRMED,
  }),
  AppointmentEntity.createDTO({
    patient_id: 1,
    schedule_id: 6,
    appointment_status: AppointmentStatus.TO_CONFIRM,
  }),
  AppointmentEntity.createDTO({
    patient_id: 2,
    schedule_id: 8,
    appointment_status: AppointmentStatus.TO_CONFIRM,
  }),
  AppointmentEntity.createDTO({
    patient_id: 2,
    schedule_id: 2,
    appointment_status: AppointmentStatus.CONFIRMED,
  }),
  AppointmentEntity.createDTO({
    patient_id: 2,
    schedule_id: 14,
    appointment_status: AppointmentStatus.TO_CONFIRM,
  }),
  AppointmentEntity.createDTO({
    patient_id: 3,
    schedule_id: 9,
    appointment_status: AppointmentStatus.CANCELLED,
  }),
  AppointmentEntity.createDTO({
    patient_id: 3,
    schedule_id: 10,
    appointment_status: AppointmentStatus.TO_CONFIRM,
  }),
  AppointmentEntity.createDTO({
    patient_id: 3,
    schedule_id: 11,
    appointment_status: AppointmentStatus.CONFIRMED,
  }),
  AppointmentEntity.createDTO({
    patient_id: 4,
    schedule_id: 12,
    appointment_status: AppointmentStatus.CONFIRMED,
  }),
  AppointmentEntity.createDTO({
    patient_id: 4,
    schedule_id: 13,
    appointment_status: AppointmentStatus.TO_CONFIRM,
  }),
  AppointmentEntity.createDTO({
    patient_id: 4,
    schedule_id: 15,
    appointment_status: AppointmentStatus.TO_CONFIRM,
  }),
  AppointmentEntity.createDTO({
    patient_id: 5,
    schedule_id: 16,
    appointment_status: AppointmentStatus.CANCELLED,
  }),
  AppointmentEntity.createDTO({
    patient_id: 5,
    schedule_id: 17,
    appointment_status: AppointmentStatus.TO_CONFIRM,
  }),
  AppointmentEntity.createDTO({
    patient_id: 5,
    schedule_id: 18,
    appointment_status: AppointmentStatus.CANCELLED,
  }),
];

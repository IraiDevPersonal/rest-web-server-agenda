import { AppointmentStatus } from "@prisma/client";

import { Uid } from "@/lib/uid";
import {
  BdAppointment,
  BdPatient,
  BdProfession,
  BdProfessionalProfession,
  BdRole,
  BdUser,
  BdUserRoles
} from "@/types/bd-model";
import { MakeOptional, MakeRequired } from "@/types/global";

export const professions: MakeRequired<BdProfession, "name">[] = [
  { name: "Psicologia" },
  { name: "Dentista" }
];

export const professionalProfession: BdProfessionalProfession[] = [
  { user_id: BigInt(1), profession_id: 1 },
  { user_id: BigInt(2), profession_id: 2 }
];

export const roles: MakeRequired<BdRole, "name">[] = [{ name: "admin" }, { name: "professional" }];

export const usersRoles: MakeRequired<BdUserRoles, "role_id" | "user_id">[] = [
  { role_id: 1, user_id: BigInt(1) },
  { role_id: 2, user_id: BigInt(2) }
];

export const patients: MakeOptional<BdPatient, "id">[] = [
  {
    email: "cosme_fulano_1@gmail.com",
    last_names: "fulano 1",
    names: "cosme 1",
    phone: "+56911111111",
    rut: "18.805.186-3",
    address: "calle falsa 123",
    birth_date: new Date("1990-01-01"),
    gender: "MA",
    status: "ACTIVE",
    uid: Uid.createV4()
  },
  {
    email: "cosme_fulano_2@gmail.com",
    last_names: "fulano 2",
    names: "cosme 2",
    phone: "+56922222222",
    rut: "3.560.077-9",
    address: "calle falsa 123",
    birth_date: new Date("1990-01-01"),
    gender: "MA",
    status: "ACTIVE",
    uid: Uid.createV4()
  },
  {
    email: "cosme_fulano_3@gmail.com",
    last_names: "fulano 3",
    names: "cosme 3",
    phone: "+56933333333",
    rut: "12.109.544-0",
    address: "calle falsa 123",
    birth_date: new Date("1990-01-01"),
    gender: "MA",
    status: "ACTIVE",
    uid: Uid.createV4()
  },
  {
    email: "cosme_fulano_4@gmail.com",
    last_names: "fulano 4",
    names: "cosme 4",
    phone: "+56944444444",
    rut: "11.111.111-1",
    address: "calle falsa 123",
    birth_date: new Date("1990-01-01"),
    gender: "MA",
    status: "ACTIVE",
    uid: Uid.createV4()
  },
  {
    email: "cosme_fulano_5@gmail.com",
    last_names: "fulano 5",
    names: "cosme 5",
    phone: "+56955555555",
    rut: "15.953.693-9",
    address: "calle falsa 123",
    birth_date: new Date("1994-01-01"),
    gender: "FE",
    status: "ACTIVE",
    uid: Uid.createV4()
  }
];

export const users: MakeOptional<BdUser, "id">[] = [
  {
    email: "pinilla.sebastianm@gmail.com",
    password: "123456",
    address: "calle falsa 123",
    avatar_image: "https://avatars.githubusercontent.com/u/1020041?v=4",
    gender: "MA",
    status: "ACTIVE",
    last_names: "acuña pinilla",
    names: "sebastian matias",
    phone: "+56948426521",
    rut: "18.804.066-7",
    uid: Uid.createV4()
  },
  {
    email: "raul.espmol@gmail.com",
    password: "123456",
    address: "calle falsa 123",
    avatar_image: "https://avatars.githubusercontent.com/u/1020041?v=4",
    gender: "MA",
    status: "ACTIVE",
    last_names: "espinoza molina",
    names: "raul ignacio",
    phone: "+56948426521",
    rut: "18.524.489-k",
    uid: Uid.createV4()
  },
  {
    email: "iraidev@gmail.com",
    password: "123456",
    address: "calle falsa 123",
    avatar_image: "https://avatars.githubusercontent.com/u/1020041?v=4",
    gender: "MA",
    status: "ACTIVE",
    last_names: "arriagada iriarte",
    names: "ignacio rodrigo",
    phone: "+56948426521",
    rut: "19.050.844-7",
    uid: Uid.createV4()
  }
];

export const appointments: MakeOptional<BdAppointment, "id" | "uid">[] = [
  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: null,
    appointment_status: AppointmentStatus.AVAILABLE
  },

  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: null,
    appointment_status: AppointmentStatus.AVAILABLE
  },

  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    appointment_status: AppointmentStatus.INDETERMINATE
  },

  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: null,
    appointment_status: AppointmentStatus.AVAILABLE
  },

  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: null,
    appointment_status: AppointmentStatus.AVAILABLE
  },

  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    appointment_status: AppointmentStatus.INDETERMINATE
  },

  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: null,
    appointment_status: AppointmentStatus.AVAILABLE
  },

  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(1),
    appointment_status: AppointmentStatus.AVAILABLE
  },

  {
    date: new Date(),
    user_id: BigInt(1),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    appointment_status: AppointmentStatus.INDETERMINATE
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: BigInt(1),
    appointment_status: AppointmentStatus.CONFIRMED
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(1),
    appointment_status: AppointmentStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    appointment_status: AppointmentStatus.INDETERMINATE
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: BigInt(2),
    appointment_status: AppointmentStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(4),
    appointment_status: AppointmentStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    appointment_status: AppointmentStatus.INDETERMINATE,
    patient_id: null
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: BigInt(5),
    appointment_status: AppointmentStatus.CANCELLED
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(5),
    appointment_status: AppointmentStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: true,
    patient_id: BigInt(5),
    appointment_status: AppointmentStatus.CANCELLED
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "10:00",
    time_to: "10:45",
    is_enabled: true,
    patient_id: BigInt(2),
    appointment_status: AppointmentStatus.CONFIRMED
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "12:00",
    time_to: "12:45",
    is_enabled: true,
    patient_id: BigInt(2),
    appointment_status: AppointmentStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "14:00",
    time_to: "14:45",
    is_enabled: false,
    patient_id: null,
    appointment_status: AppointmentStatus.INDETERMINATE
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "09:00",
    time_to: "09:15",
    is_enabled: true,
    patient_id: BigInt(3),
    appointment_status: AppointmentStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "09:30",
    time_to: "09:45",
    is_enabled: true,
    patient_id: BigInt(3),
    appointment_status: AppointmentStatus.CONFIRMED
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "12:00",
    time_to: "12:15",
    is_enabled: false,
    patient_id: null,
    appointment_status: AppointmentStatus.CONFIRMED
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: BigInt(4),
    appointment_status: AppointmentStatus.CONFIRMED
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(4),
    appointment_status: AppointmentStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    user_id: BigInt(2),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    appointment_status: AppointmentStatus.INDETERMINATE
  }
];

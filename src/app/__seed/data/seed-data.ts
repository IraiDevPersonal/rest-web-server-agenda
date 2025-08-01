import { ScheduleStatus } from "@prisma/client";

import { Uid } from "@/lib/uid";
import {
  BdPatient,
  BdProfession,
  BdProfessional,
  BdProfessionalProfession,
  BdRole,
  BdSchedule,
  BdServiceProviders,
  BdUser
} from "@/types/bd-model";
import { MakeOptional, MakeRequired } from "@/types/global";

type MakeServiceProvider = MakeRequired<
  BdServiceProviders<{
    include: {
      service_provider_codes: {
        omit: {
          service_provider_id: true;
          id: true;
        };
      };
    };
  }>,
  "name" | "rut"
>;

export const serviceProvider: MakeServiceProvider[] = [
  {
    name: "Primero llamado",
    rut: "12.109.544-0",
    service_provider_codes: [
      {
        title: "Codigo 1",
        code: "1231241231"
      },
      {
        title: "Codigo 2",
        code: "123124123112312"
      }
    ]
  }
];

export const professions: MakeRequired<BdProfession, "name">[] = [
  { name: "Psicologia" },
  { name: "Dentista" }
];

export const professionalProfession: BdProfessionalProfession[] = [
  { professional_id: BigInt(1), profession_id: 1 },
  { professional_id: BigInt(2), profession_id: 2 }
];

export const roles: MakeRequired<BdRole, "name">[] = [
  { name: "admin" },
  { name: "professional" }
];

export const patients: MakeOptional<BdPatient, "id">[] = [
  {
    email: "cosme_fulano_1@gmail.com",
    last_names: "fulano 1",
    names: "cosme 1",
    phone: "+56911111111",
    rut: "18.805.186-3",
    address: "calle falsa 123",
    is_deleted: false,
    uid: Uid.createV4()
  },
  {
    email: "cosme_fulano_2@gmail.com",
    last_names: "fulano 2",
    names: "cosme 2",
    phone: "+56922222222",
    rut: "3.560.077-9",
    address: "calle falsa 123",
    is_deleted: false,
    uid: Uid.createV4()
  },
  {
    email: "cosme_fulano_3@gmail.com",
    last_names: "fulano 3",
    names: "cosme 3",
    phone: "+56933333333",
    rut: "12.109.544-0",
    address: "calle falsa 123",
    is_deleted: false,
    uid: Uid.createV4()
  },
  {
    email: "cosme_fulano_4@gmail.com",
    last_names: "fulano 4",
    names: "cosme 4",
    phone: "+569444444444",
    rut: "11.111.111-1",
    address: "calle falsa 123",
    is_deleted: false,
    uid: Uid.createV4()
  },
  {
    email: "cosme_fulano_5@gmail.com",
    last_names: "fulano 5",
    names: "cosme 5",
    phone: "+569555555555",
    rut: "15.953.693-9",
    address: "calle falsa 123",
    is_deleted: false,
    uid: Uid.createV4()
  }
];

export const users: MakeOptional<BdUser, "id">[] = [
  {
    email: "pinilla.sebastianm@gmail.com",
    password: "123456",
    role_id: 1,
    is_admin: true,
    last_names: "acuña pinilla",
    names: "sebastian matias",
    phone: "+56948426521",
    rut: "18.804.066-7",
    uid: Uid.createV4()
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
    uid: Uid.createV4()
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
    uid: Uid.createV4()
  }
];

export const professionals: MakeRequired<BdProfessional, "user_id">[] = [
  {
    user_id: BigInt(1)
  },
  {
    user_id: BigInt(2)
  }
];

export const schedules: MakeOptional<BdSchedule, "id" | "uid">[] = [
  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: null,
    schedule_status: ScheduleStatus.AVAILABLE
  },

  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: null,
    schedule_status: ScheduleStatus.AVAILABLE
  },

  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    schedule_status: ScheduleStatus.INDETERMINATE
  },

  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: null,
    schedule_status: ScheduleStatus.AVAILABLE
  },

  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: null,
    schedule_status: ScheduleStatus.AVAILABLE
  },

  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    schedule_status: ScheduleStatus.INDETERMINATE
  },

  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: null,
    schedule_status: ScheduleStatus.AVAILABLE
  },

  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(1),
    schedule_status: ScheduleStatus.AVAILABLE
  },

  {
    date: new Date(),
    professional_id: BigInt(1),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    schedule_status: ScheduleStatus.INDETERMINATE
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: BigInt(1),
    schedule_status: ScheduleStatus.CONFIRMED
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(1),
    schedule_status: ScheduleStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    schedule_status: ScheduleStatus.INDETERMINATE
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: BigInt(2),
    schedule_status: ScheduleStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(4),
    schedule_status: ScheduleStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    schedule_status: ScheduleStatus.INDETERMINATE,
    patient_id: null
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: BigInt(5),
    schedule_status: ScheduleStatus.CANCELLED
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(5),
    schedule_status: ScheduleStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: true,
    patient_id: BigInt(5),
    schedule_status: ScheduleStatus.CANCELLED
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "10:00",
    time_to: "10:45",
    is_enabled: true,
    patient_id: BigInt(2),
    schedule_status: ScheduleStatus.CONFIRMED
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "12:00",
    time_to: "12:45",
    is_enabled: true,
    patient_id: BigInt(2),
    schedule_status: ScheduleStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "14:00",
    time_to: "14:45",
    is_enabled: false,
    patient_id: null,
    schedule_status: ScheduleStatus.INDETERMINATE
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "09:00",
    time_to: "09:15",
    is_enabled: true,
    patient_id: BigInt(3),
    schedule_status: ScheduleStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "09:30",
    time_to: "09:45",
    is_enabled: true,
    patient_id: BigInt(3),
    schedule_status: ScheduleStatus.CONFIRMED
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "12:00",
    time_to: "12:15",
    is_enabled: false,
    patient_id: null,
    schedule_status: ScheduleStatus.CONFIRMED
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "08:00",
    time_to: "08:45",
    is_enabled: true,
    patient_id: BigInt(4),
    schedule_status: ScheduleStatus.CONFIRMED
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "15:00",
    time_to: "15:45",
    is_enabled: true,
    patient_id: BigInt(4),
    schedule_status: ScheduleStatus.TO_CONFIRM
  },

  {
    date: new Date(),
    professional_id: BigInt(2),
    time_from: "16:00",
    time_to: "16:45",
    is_enabled: false,
    patient_id: null,
    schedule_status: ScheduleStatus.INDETERMINATE
  }
];

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export type BdAppointment<
  T extends Prisma.appointmentDefaultArgs<DefaultArgs> = {}
> = Prisma.appointmentGetPayload<T>;

export type BdProfession<
  T extends Prisma.professionsDefaultArgs<DefaultArgs> = {}
> = Prisma.professionsGetPayload<T>;

export type BdProfessional<
  T extends Prisma.professionalsDefaultArgs<DefaultArgs> = {}
> = Prisma.professionalsGetPayload<T>;

export type BdUser<T extends Prisma.usersDefaultArgs<DefaultArgs> = {}> =
  Prisma.usersGetPayload<T>;

export type BdPatient<T extends Prisma.patientsDefaultArgs<DefaultArgs> = {}> =
  Prisma.patientsGetPayload<T>;

export type BdSchedule<
  T extends Prisma.schedulesDefaultArgs<DefaultArgs> = {}
> = Prisma.schedulesGetPayload<T>;

export type BdRole<T extends Prisma.rolesDefaultArgs<DefaultArgs> = {}> =
  Prisma.rolesGetPayload<T>;

export type BdServiceProviders<
  T extends Prisma.service_providersDefaultArgs<DefaultArgs> = {}
> = Prisma.service_providersGetPayload<T>;

export type BdServiceProviderCodes<
  T extends Prisma.service_provider_codesDefaultArgs<DefaultArgs> = {}
> = Prisma.service_provider_codesGetPayload<T>;

export type BdProfessionalProfession<
  T extends Prisma.professional_professionsDefaultArgs<DefaultArgs> = {}
> = Prisma.professional_professionsGetPayload<T>;

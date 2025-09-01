import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export type BdAppointment<
  T extends Prisma.appointmentsDefaultArgs<DefaultArgs> = {}
> = Prisma.appointmentsGetPayload<T>;

export type BdPatient<T extends Prisma.patientsDefaultArgs<DefaultArgs> = {}> =
  Prisma.patientsGetPayload<T>;

export type BdProfessionalProfession<
  T extends Prisma.professional_professionsDefaultArgs<DefaultArgs> = {}
> = Prisma.professional_professionsGetPayload<T>;

export type BdProfession<
  T extends Prisma.professionsDefaultArgs<DefaultArgs> = {}
> = Prisma.professionsGetPayload<T>;

export type BdRole<T extends Prisma.rolesDefaultArgs<DefaultArgs> = {}> =
  Prisma.rolesGetPayload<T>;

export type BdUser<T extends Prisma.usersDefaultArgs<DefaultArgs> = {}> =
  Prisma.usersGetPayload<T>;

export type BdUserRoles<
  T extends Prisma.users_rolesDefaultArgs<DefaultArgs> = {}
> = Prisma.users_rolesGetPayload<T>;

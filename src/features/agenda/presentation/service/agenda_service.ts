import { PrismaClient } from "@prisma/client";
import { GetMyDayFilter } from "../../domain/entities/filters";

export class AgendaService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getAppointmentDetail(appointment_uid: string) {
    return await this.db.appointment.findFirst({
      select: {
        uid: true,
        schedule: {
          select: {
            professional: {
              select: {
                professional_profession: {
                  select: {
                    professions: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
                user: {
                  select: {
                    names: true,
                    last_names: true,
                  },
                },
              },
            },
          },
        },
        patient: {
          select: {
            names: true,
            last_names: true,
            rut: true,
            phone: true,
            email: true,
          },
        },
      },
      where: {
        uid: appointment_uid,
      },
    });
  }

  async getMyDay({
    type,
    date,
    date_from,
    date_to,
    patient_rut,
    professional_id,
    profession_id,
  }: GetMyDayFilter) {
    return await this.db.appointment.findMany({
      select: {
        uid: true,
        appointment_status: true,
        schedule: {
          select: {
            date: true,
            time_from: true,
            time_to: true,
            professional: {
              select: {
                user: {
                  select: {
                    names: true,
                    last_names: true,
                  },
                },
                professional_profession: {
                  select: {
                    professions: true,
                  },
                },
              },
            },
          },
        },
        patient: {
          select: {
            names: true,
            last_names: true,
            rut: true,
            phone: true,
          },
        },
      },
      where: {
        appointment_status: type,
        schedule: {
          // date: date,
          date: date ?? {
            gte: date_from,
            lte: date_to,
          },

          professional_id: professional_id,
          professional: {
            professional_profession: {
              some: {
                profession_id: profession_id,
              },
            },
          },
        },

        patient: {
          rut: { contains: patient_rut },
        },
      },
    });
  }
}

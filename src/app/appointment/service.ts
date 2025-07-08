import { PrismaClient } from "@prisma/client";
import { AppointmentFilters } from "./models/appointment";

export class AppointmentService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getOneAppointment(appointment_uid: string) {
    return await this.db.appointment.findFirst({
      select: {
        uid: true,
        appointment_status: true,
        schedule: {
          select: {
            date: true,
            time_from: true,
            time_to: true,
            is_enabled: true,
            week_day: true,
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
                    rut: true
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
            address: true,
            appointments: {
              orderBy: {
                schedule: {
                  date: "desc"
                }
              },
              take: 4,
              select: {
                uid: true,
                appointment_status: true,
                schedule: {
                  select: {
                    date: true,
                    time_from: true,
                    time_to: true,
                  }
                }
              }
            }
          },
        },
      },
      where: {
        uid: appointment_uid,
      },
    });
  }

  async getAppointments({
    professional_id,
    profession_id,
    patient_rut,
    date_from,
    date_to,
    date,
    type,
  }: AppointmentFilters) {
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
      orderBy: [
        {
          schedule: {
            date: 'asc',
          },
        },
        {
          schedule: {
            time_from: 'asc',
          },
        },
      ],
    });
  }
}

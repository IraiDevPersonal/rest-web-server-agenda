import { PrismaClient } from "@prisma/client";
import { AppointmentFilters } from "./models/appointment-filters";

export class AppointmentService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getAppointmentDetail(appointment_uid: string) {
    return await this.db.appointments.findFirst({
      select: {
        uid: true,
        appointment_status: true,
        date: true,
        time_from: true,
        time_to: true,
        is_enabled: true,
        user: {
          select: {
            names: true,
            last_names: true,
            rut: true,
            professions: {
              select: {
                profession: { select: { name: true } }
              }
            }
          }
        },
        patient: {
          omit: {
            id: true
          },
          include: {
            appointments: {
              orderBy: {
                date: "desc"
              },
              take: 4,
              select: {
                uid: true,
                appointment_status: true,
                date: true,
                time_from: true,
                time_to: true
              }
            }
          }
        }
      },
      where: {
        uid: appointment_uid
      }
    });
  }

  async getAppointments({
    professional_id,
    profession_id,
    patient_rut,
    date_from,
    date_to,
    date,
    type
  }: AppointmentFilters) {
    return await this.db.appointments.findMany({
      select: {
        id: true,
        uid: true,
        appointment_status: true,
        date: true,
        time_from: true,
        time_to: true,
        user: {
          select: {
            names: true,
            last_names: true,
            professions: true
          }
        },
        patient: {
          select: {
            names: true,
            last_names: true,
            rut: true,
            phone: true
          }
        }
      },
      where: {
        appointment_status: type,
        date: date ?? {
          gte: date_from,
          lte: date_to
        },
        user_id: professional_id,
        user: {
          professions: {
            some: { profession_id: profession_id }
          }
        },
        ...(patient_rut && {
          patient: {
            rut: { contains: patient_rut }
          }
        })
      },
      orderBy: [
        {
          date: "asc"
        },
        {
          time_from: "asc"
        }
      ]
    });
  }
}

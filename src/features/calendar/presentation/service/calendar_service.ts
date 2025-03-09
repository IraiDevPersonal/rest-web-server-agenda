import { PrismaClient } from "@prisma/client";
import { GetCalendarFilter } from "../../domain/entities/filters";

export class CalendarService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getCountAppointmentsByDateAndStatus({
    date_from,
    type,
  }: Pick<GetCalendarFilter, "date_from" | "type">) {
    return await this.db.appointment.count({
      where: {
        appointment_status: type,
        schedule: {
          date: date_from,
        },
      },
    });
  }

  async getCalendar({
    date_from,
    date_to,
    patient_rut,
    profession_id,
    professional_id,
    type,
  }: GetCalendarFilter) {
    return await this.db.schedules.findMany({
      select: {
        uid: true,
        time_from: true,
        time_to: true,
        date: true,
        professional: {
          select: {
            user: {
              select: {
                names: true,
                last_names: true,
              },
            },
          },
        },
        appointments: {
          select: {
            uid: true,
            patient: {
              select: {
                names: true,
                last_names: true,
                rut: true,
              },
            },
          },
        },
      },
      where: {
        date: {
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
        appointments: {
          some: {
            patient: {
              rut: {
                contains: patient_rut,
                mode: "insensitive",
              },
            },
            appointment_status: type,
          },
        },
      },
    });
  }
}

import { PrismaClient } from "@prisma/client";
import { AgendaFilter } from "../../../agenda/domain/entities/agenda_filters";

export class AppointmentService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getAppointments({ type }: AgendaFilter) {
    return await this.db.appointment.findMany({
      include: {
        patient: true,
        schedule: {
          include: {
            appointments: true,
            professional: { include: { role: true } },
          },
        },
      },
      where: {
        appointment_status: type,
      },
    });
  }
}

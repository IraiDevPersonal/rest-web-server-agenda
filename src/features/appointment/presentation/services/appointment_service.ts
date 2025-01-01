import { PrismaClient } from "@prisma/client";

export class AppointmentService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getAppointments() {
    return await this.db.appointment.findMany({
      include: {
        appointment_status: true,
        patient: true,
        schedule: true,
      },
    });
  }
}

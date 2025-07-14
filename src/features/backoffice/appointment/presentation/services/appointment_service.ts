import { PrismaClient } from '@prisma/client';

export class AppointmentService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async get() {
    return await this.db.appointment.findMany({
      select: { id: false }
    });
  }
}

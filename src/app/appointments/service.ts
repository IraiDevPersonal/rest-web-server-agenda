import { CustomError } from "@/lib/custom-error";
import { PrismaClient } from "@prisma/client";
import type { AppointmentFilters } from "./models/appointment-filters.model";
import type { AppointmentServiceRepository } from "./repository";

export class AppointmentService implements AppointmentServiceRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  private aplliedFilters = (filters: Partial<AppointmentFilters>) => {
    return {
      appointment_status: filters.type,
      date: filters.date ?? {
        gte: filters.date_from,
        lte: filters.date_to
      },
      user_id: filters.professional_id,
      user: {
        professions: {
          some: { profession_id: filters.profession_id }
        }
      },
      ...(filters.patient_rut && {
        patient: {
          rut: { contains: filters.patient_rut }
        }
      })
    };
  };

  private buildAppointmentsFieldsSelector = () => {
    return {
      id: true,
      uid: true,
      date: true,
      time_to: true,
      time_from: true,
      is_enabled: true,
      appointment_status: true,
      user: {
        select: {
          names: true,
          last_names: true,
          professions: {
            select: {
              profession: {
                select: {
                  name: true
                }
              }
            }
          }
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
    };
  };

  private buildAppointmentDetailFieldsSelector = () => {
    return {
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
          id: true,
          status: true,
          gender: true,
          birth_date: true
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
    } as any;
  };

  async getAppointments(filters: AppointmentFilters) {
    try {
      return await this.db.appointments.findMany({
        select: this.buildAppointmentsFieldsSelector(),
        where: this.aplliedFilters(filters),
        orderBy: [
          {
            date: "asc"
          },
          {
            time_from: "asc"
          }
        ]
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  }

  async getAppointmentByUid(uid: string) {
    try {
      return await this.db.appointments.findFirst({
        select: this.buildAppointmentDetailFieldsSelector(),
        where: { uid }
      });
    } catch (error) {
      throw CustomError.bdError(error);
    }
  }
}

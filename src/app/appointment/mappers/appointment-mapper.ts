import {
  type AppointmentModel,
  AppointmentSchema
} from "../models/appointment";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { safeArray } from "@/lib/utils";
import { BdSchedule } from "@/types/bd-model";

type BdAppointmentScheduleAndProfessions = BdSchedule<{
  include: {
    patient: true;
    professional: {
      select: {
        user: true;
      };
      include: {
        professional_profession: {
          include: {
            professions: {
              select: {
                name: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export class AppointmentMapper {
  static validate(item: BdAppointmentScheduleAndProfessions): AppointmentModel {
    try {
      const data = AppointmentMapper.mapper(item);
      return AppointmentSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "appointment-mapper.ts: (validate)")
      );
    }
  }

  static response(data: any): AppointmentModel[] {
    return safeArray(data, {
      errorMessage: "appointment-mapper.ts (response): se eperaba un array"
    }).map(AppointmentMapper.validate);
  }

  private static mapper(
    item: BdAppointmentScheduleAndProfessions
  ): AppointmentModel {
    const patient = item.patient;
    const professional = item.professional;
    const professions = professional.professional_profession.map(
      (p) => p.professions.name
    );

    return {
      uid: item.uid,
      time_from: item.time_from,
      time_to: item.time_to,
      patient_rut: patient?.rut ?? null,
      patient_phone: patient?.phone ?? null,
      patient_name: patient ? `${patient.names} ${patient.last_names}` : null,
      professional_name: `${professional.user.names} ${professional.user.last_names}`,
      date: DateFormatter.formatDate(item.date, "ymd"),
      appointment_status: item.schedule_status,
      professions
    };
  }
}

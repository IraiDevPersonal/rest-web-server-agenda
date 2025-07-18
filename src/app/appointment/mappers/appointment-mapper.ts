import {
  type AppointmentModel,
  AppointmentSchema
} from "../models/appointment";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { safeArray } from "@/lib/utils";
import { BdAppointment } from "@/types/bd-model";

type BdAppointmentScheduleAndProfessions = BdAppointment<{
  include: {
    schedule: {
      include: {
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
    };
    patient: true;
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
    const schedule = item.schedule;
    const patient = item.patient;
    const professional = schedule.professional;
    const professions = professional.professional_profession.map(
      (p) => p.professions.name
    );

    return {
      uid: item.uid,
      time_from: schedule.time_from,
      time_to: schedule.time_to,
      patient_rut: patient?.rut ?? null,
      patient_phone: patient?.phone ?? null,
      patient_name: patient ? `${patient.names} ${patient.last_names}` : null,
      professional_name: `${professional.user.names} ${professional.user.last_names}`,
      date: DateFormatter.formatDate(schedule.date, "ymd"),
      appointment_status: item.appointment_status,
      professions
    };
  }

  // static upsertDTO(
  //   object: UpsertAppointmentValues,
  //   action: "create" | "update"
  // ) {
  //   const appointment = AppointmentMapper.validateUpsertValues(object);

  //   if (action === "create") {
  //     delete appointment.id;
  //   }

  //   if (action === "update" && !appointment.id) {
  //     throw CustomError.badRequest("Id es requerida para actualizar");
  //   }

  //   return appointment;
  // }

  // private static validateUpsertValues(value: any) {
  //   try {
  //     return UpsertAppointmentSchema.parse(value);
  //   } catch (error) {
  //     throw CustomError.internalServer(
  //       CustomError.getErrorMessage(
  //         error,
  //         "appointment-mapper.ts: (validateValues)"
  //       )
  //     );
  //   }
  // }
}

import { AppointmentStatus } from "@prisma/client";

import {
  type AppointmentModel,
  type UpsertAppointmentValues,
  AppointmentSchema,
  UpsertAppointmentSchema
} from "../models/appointment";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { Uid } from "@/lib/uid";
import { safeArray } from "@/lib/utils";

export class AppointmentMapper {
  static validate(item: any): AppointmentModel {
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
    try {
      return safeArray<AppointmentModel>(data, {
        throwErrors: true,
        errorMessage: "se eperaba un arreglo de citas"
      }).map(AppointmentMapper.validate);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "appointment-mapper.ts: (response)")
      );
    }
  }

  static upsertDTO(
    object: UpsertAppointmentValues,
    action: "create" | "update"
  ) {
    const appointment = AppointmentMapper.validateUpsertValues(object);

    if (action === "create") {
      delete appointment.id;
    }

    if (action === "update" && !appointment.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }

    return appointment;
  }

  private static validateUpsertValues(value: any) {
    try {
      return UpsertAppointmentSchema.parse(value);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "appointment-mapper.ts: (validateValues)"
        )
      );
    }
  }

  private static mapper(item: any): AppointmentModel {
    const schedule = item?.schedule;
    const patient = item?.patient;
    const professional = schedule?.professional;
    const professions = safeArray<any>(professional?.professional_profession);

    return {
      uid: item?.uid ?? Uid.createV4(),
      time_from: schedule?.time_from ?? "hh:mm",
      time_to: schedule?.time_to ?? "hh:mm",
      patient_rut: patient?.rut ?? "sin rut",
      patient_phone: patient?.phone ?? "sin teléfono",
      patient_name: `${patient?.names ?? "sin nombres"} ${patient?.last_names ?? "sin apellidos"}`,
      professional_name: `${professional?.user?.names ?? "sin nombres"} ${professional?.user?.last_names ?? "sin apellidos"}`,
      date: schedule?.date
        ? DateFormatter.formatDate(schedule.date, "ymd")
        : "aaaa-mm-dd",
      appointment_status:
        item?.appointment_status ?? AppointmentStatus.INDETERMINATE,
      professions: professions.map(
        (p, idx) => p?.professions?.name ?? `Profesión indeterminada ${idx + 1}`
      )
    };
  }
}

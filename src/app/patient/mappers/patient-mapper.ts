import { AppointmentStatus } from "@prisma/client";

import {
  PatientForAppointmentDetailSchema,
  PatientHistoryForAppointmentDetailSchema,
  PatientSchema,
  type PatientHistoryForAppointmentDetailModel,
  type PatientForAppointmentDetailModel,
  type PatientModel
} from "../models/patient";

import { DateFormatter } from "@/lib/date-formatter";
import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { Uid } from "@/lib/uid";

export class PatientMapper {
  static validatePatient(item: any): PatientModel {
    try {
      const data: PatientModel = {
        id: item?.id,
        uid: item?.uid ?? Uid.createV4(),
        rut: item?.rut ?? "sin rut",
        names: item?.names ?? "sin nombres",
        last_names: item?.last_names ?? "sin apellidos",
        email: item?.email ?? "sin correo",
        phone: item?.phone ?? "sin teléfono",
        address: item?.address ?? "sin dirección",
        is_deleted: item?.is_deleted ?? false
      };

      return PatientSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "patient-mapper.ts: (validate)")
      );
    }
  }

  static patientResponse(item: any): PatientModel[] {
    try {
      return safeArray<PatientModel>(item, {
        throwErrors: true,
        errorMessage: "se espera un array de pacientes"
      }).map(PatientMapper.validatePatient);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "patient-mapper.ts: (serverResponse)"
        )
      );
    }
  }

  static validatePatientForAppointmentDetail(
    item: any
  ): PatientForAppointmentDetailModel {
    try {
      const data: PatientForAppointmentDetailModel = {
        names: item.names ?? "sin nombres",
        last_names: item.names ?? "sin apellidos",
        rut: item.names ?? "sin rut",
        phone: item.names ?? "sin teléfono",
        email: item.names ?? "sin correo",
        address: item.names ?? "sin dirección"
      };

      return PatientForAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "patient--mapper.ts: (validatePatienForAppointmentDetail)"
        )
      );
    }
  }

  static validatePatientHistoryForAppointmentDetail(
    item: any
  ): PatientHistoryForAppointmentDetailModel {
    try {
      const schedule = item.schedule;
      const date = schedule?.date
        ? DateFormatter.formatDate(schedule?.date, "dmy")
        : "dd-mm-aaaa";
      const timeFrom = schedule?.time_from ?? "hh:mm";
      const timeTo = schedule?.time_to ?? "hh:mm";

      const data: PatientHistoryForAppointmentDetailModel = {
        uid: item.uid,
        date_time: `${date} ${timeFrom}-${timeTo}`,
        status: item?.appointment_status ?? AppointmentStatus.INDETERMINATE
      };

      return PatientHistoryForAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "patient--mapper.ts: (validatePatientHistoryForAppointmentDetail)"
        )
      );
    }
  }

  static patientHistoryArray(
    data: any
  ): PatientHistoryForAppointmentDetailModel[] {
    return safeArray<PatientHistoryForAppointmentDetailModel>(data).map(
      PatientMapper.validatePatientHistoryForAppointmentDetail
    );
  }
}

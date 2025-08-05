import { CustomError } from "@/lib/custom-error";
import { RutManager } from "@/lib/rut-manager";
import { ExpandPatientTypes } from "../models";
import { PatientSchema } from "../models/patient";
import { Request } from "express";

export class PatientValidations {
  private static _getExpandQuery(query: Request["query"]) {
    return query.expand as ExpandPatientTypes[] | undefined;
  }

  static insertValidation(body: any) {
    const { rut, names, last_names, email, phone, address } = body;

    return PatientSchema.parse({
      rut: RutManager.format(rut, { dots: true }),
      names,
      last_names,
      email,
      phone,
      address
    });
  }

  static updateValidation(body: any) {
    return PatientSchema.partial().parse(body);
  }

  static patientExists<T>(bdPatient: T, uid: string): NonNullable<T> {
    if (!bdPatient) {
      throw CustomError.badRequest(`No se ha encontrado al paciente UID: ${uid}`);
    }
    return bdPatient!;
  }

  static rutInUse(rut: string | undefined) {
    if (rut) {
      throw CustomError.badRequest(`Rut ${rut} ya esta resgistrado`);
    }
  }

  static emailInUse(email: string | undefined) {
    if (email) {
      throw CustomError.badRequest(`Correo ${email} ya esta resgistrado`);
    }
  }

  static withHistory(query: Request["query"]) {
    return this._getExpandQuery(query)?.includes("appointment_history") ? [] : undefined;
  }

  static withId(query: Request["query"]) {
    return !this._getExpandQuery(query)?.includes("id");
  }
}

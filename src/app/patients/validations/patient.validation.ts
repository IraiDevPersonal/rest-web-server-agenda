import { CustomError } from "@/lib/custom-error";
import { RutManager } from "@/lib/rut-manager";
import { ExpandPatientTypes } from "../models/shared";
import { PatientBdSchema } from "../schemas/bd/patient-schema";
import { Request } from "express";

export class PatientValidation {
  private static getExpandQuery(query: Request["query"]) {
    return query.expand as ExpandPatientTypes[] | undefined;
  }

  static validateInsert(body: any) {
    // FIXME: usar un schema propio para esto
    return PatientBdSchema.parse({
      rut: RutManager.format(body.rut, { dots: true }),
      ...body
    });
  }

  static validateUpdate(body: any) {
    // FIXME: usar un schema propio para esto
    return PatientBdSchema.partial().parse(body);
  }

  static exists<T>(bdPatient: T, uid: string): NonNullable<T> {
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
    return this.getExpandQuery(query)?.includes("appointment_history") ? [] : undefined;
  }

  static withId(query: Request["query"]) {
    return !this.getExpandQuery(query)?.includes("id");
  }
}

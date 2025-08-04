import { CustomError } from "@/lib/custom-error";
import { RutManager } from "@/lib/rut-manager";
import { ExpandPatientTypes } from "../models";
import { PatientSchema } from "../models/patient";

export class PatientValidations {
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
    const { rut, names, last_names, email, phone, address } = body;

    if (rut) {
      PatientSchema.shape.rut.parse(rut);
    }
    if (names) {
      PatientSchema.shape.names.parse(names);
    }
    if (last_names) {
      PatientSchema.shape.last_names.parse(last_names);
    }
    if (email) {
      PatientSchema.shape.email.parse(email);
    }
    if (phone) {
      PatientSchema.shape.phone.parse(phone);
    }
    if (address) {
      PatientSchema.shape.address.parse(address);
    }

    return {
      rut,
      names,
      last_names,
      email,
      phone,
      address
    };
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

  static withHistory(expand: ExpandPatientTypes[] | undefined) {
    return expand?.includes("appointment_history") ? [] : undefined;
  }

  static withId(expand: ExpandPatientTypes[] | undefined) {
    return !expand?.includes("id");
  }
}

import { CustomError } from "@/lib/custom-error";

export class AppointmentValidation {
  static exist<T>(appointment: T, uid: string): NonNullable<T> {
    if (!appointment) {
      throw CustomError.badRequest(`No se encontró cita para el UID: ${uid}`);
    }
    return appointment;
  }
}

import { ExistenceValidation } from "@/lib/validations/existence.validation";

export class AppointmentValidations {
  static requireExists<T>(appointment: T) {
    return ExistenceValidation.requireExists(appointment, "Cita no encontrada");
  }
}

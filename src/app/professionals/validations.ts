import { UserValidations } from "../users/validations";

export class ProfessionalValidations extends UserValidations {
  static requireExists<T>(value: T) {
    return super.requireExists(value, "Profesional no encontrado");
  }
}

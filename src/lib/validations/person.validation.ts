import { DateFormatter } from '../date-formatter';
import { RutManager } from '../rut-manager';

export class PersonValidation {
  static formatBirthDate(birth_date: any) {
    return birth_date ? DateFormatter.stringToDate(birth_date) : undefined;
  }

  static formatRut(rut: any) {
    return rut ? RutManager.format(rut, { dots: true }) : undefined;
  }
}

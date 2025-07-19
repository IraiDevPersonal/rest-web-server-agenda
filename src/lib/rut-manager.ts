import { clean, format, validate } from 'rut.js';

export class RutManager {
  static validate(rut: string) {
    return validate(rut);
  }

  static format(rut: string, { dots = true }: { dots?: boolean }) {
    return format(rut, { dots: dots });
  }

  static clean(rut: string) {
    return clean(rut);
  }
}

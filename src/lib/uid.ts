import { v4, validate } from 'uuid';

export class Uid {
  static createV4() {
    return v4();
  }

  static isValid(uid: string) {
    return validate(uid);
  }
}

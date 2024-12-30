import { CustomError } from "../../../core/domain/custom.error";

type Init = {
  id: number;
  uid: string;
  rut: string;
  names: string;
  last_names: string;
  email: string;
  phone: string;
};

export class PatientEntity {
  public id: number;
  public uid: string;
  public rut: string;
  public names: string;
  public last_names: string;
  public email: string;
  public phone: string;

  private constructor(init: Init) {
    this.id = init.id;
    this.uid = init.uid;
    this.rut = init.rut;
    this.names = init.names;
    this.last_names = init.last_names;
    this.email = init.email;
    this.phone = init.phone;
  }

  static fromObject(object: Record<string, any>) {
    const { id, uid, rut, names, last_names, email, phone } = object;

    if (!id) {
      throw CustomError.badRequest("Missing id");
    }

    if (!uid) {
      throw CustomError.badRequest("Missing uid");
    }

    if (!rut) {
      throw CustomError.badRequest("Missing rut");
    }

    if (!names) {
      throw CustomError.badRequest("Missing names");
    }

    if (!last_names) {
      throw CustomError.badRequest("Missing lastnames");
    }

    if (!email) {
      throw CustomError.badRequest("Missing email");
    }

    return new PatientEntity({
      last_names,
      id,
      email,
      names,
      phone,
      rut,
      uid,
    });
  }
}

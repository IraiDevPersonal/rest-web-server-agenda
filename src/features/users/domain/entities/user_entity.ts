import { RoleModel } from "../../../roles/domain/models/role_model";

import { CustomError } from "../../../core/domain/custom.error";

type Init = {
  id: number;
  uid: string;
  rut: string;
  names: string;
  last_names: string;
  email: string;
  password: string;
  is_admin: boolean;
  phone: string;
  role_id: number;
  role: RoleModel;
};

export class UserEntity {
  public id: number;
  public uid: string;
  public rut: string;
  public names: string;
  public last_names: string;
  public email: string;
  public password: string;
  public is_admin: boolean;
  public phone: string;
  public role_id: number;
  public role: RoleModel;

  private constructor(init: Init) {
    this.id = init.id;
    this.uid = init.uid;
    this.rut = init.rut;
    this.names = init.names;
    this.last_names = init.last_names;
    this.email = init.email;
    this.password = init.password;
    this.is_admin = init.is_admin;
    this.phone = init.phone;
    this.role_id = init.role_id;
    this.role = init.role;
  }

  static fromObject(object: Record<string, any>) {
    const {
      id,
      uid,
      rut,
      names,
      last_names,
      email,
      password,
      is_admin,
      phone,
      role_id,
      role,
    } = object;

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

    if (!password) {
      throw CustomError.badRequest("Missing password");
    }

    if (!phone) {
      throw CustomError.badRequest("Missing password");
    }

    if (is_admin === undefined) {
      throw CustomError.badRequest("Missing password");
    }

    if (role_id === undefined) {
      throw CustomError.badRequest("Missing password");
    }

    if (!role) {
      throw CustomError.badRequest("Missing password");
    }

    return new UserEntity({
      id,
      uid,
      rut,
      names,
      last_names,
      email,
      password,
      is_admin,
      phone,
      role_id,
      role,
    });
  }
}

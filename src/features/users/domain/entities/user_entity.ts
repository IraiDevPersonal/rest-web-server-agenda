import { RoleModel } from "../../../roles/domain/entities/role_entity";
import { CustomError } from "../../../core/domain/custom.error";
import { userSchema } from "../../presentation/schemas/user_schema";
import { z } from "zod";

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
    const { role } = object;

    try {
      const scheme = userSchema.parse(object);
      return new UserEntity({ ...scheme, role: role });
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

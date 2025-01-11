import { CustomError } from "../../../core/domain/custom.error";
import { RoleEntity } from "../../../roles/domain/entities/role_entity";
import { userSchema } from "../../presentation/schemas/user_schema";

type Init = {
  id?: number | undefined;
  uid?: string | undefined;
  rut: string;
  names: string;
  last_names: string;
  email: string;
  password: string;
  is_admin: boolean;
  phone: string;
  role_id: number;
  role: RoleEntity;
};

export class UserEntity {
  public id?: number | undefined;
  public uid?: string | undefined;
  public rut: string;
  public names: string;
  public last_names: string;
  public email: string;
  public password: string;
  public is_admin: boolean;
  public phone: string;
  public role_id: number;
  public role: RoleEntity;

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

  static toResponse(
    object: Record<string, any>
  ): Omit<UserEntity, "password" | "role_id"> {
    return {
      email: object["email"],
      uid: object["uid"],
      rut: object["rut"],
      names: object["names"],
      last_names: object["last_names"],
      is_admin: object["is_admin"],
      phone: object["phone"],
      role: RoleEntity.toResponse(object["role"]),
    };
  }

  static fromJson(object: Record<string, any>) {
    const { role } = object;

    try {
      const scheme = userSchema.parse(object);
      return new UserEntity({ ...scheme, role: role });
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

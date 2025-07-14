import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { RoleEntity } from "@/app/role/entities/role-entity";
import { safeArray } from "@/lib/utils";

const UserSchema = z.object({
  id: z.optional(z.number()),
  email: z.string().email(),
  is_admin: z.boolean(),
  last_names: z.string(),
  names: z.string(),
  password: z.string(),
  phone: z.string(),
  role_id: z.number(),
  rut: z.string().max(12),
  uid: z.optional(z.string()),
  role: z.optional(RoleEntity.getSchema())
});

type UserModel = z.infer<typeof UserSchema>;

export class UserEntity {
  public id?: UserModel["id"];
  public email: UserModel["email"];
  public is_admin: UserModel["is_admin"];
  public last_names: UserModel["last_names"];
  public names: UserModel["names"];
  public password: UserModel["password"];
  public phone: UserModel["phone"];
  public role_id: UserModel["role_id"];
  public rut: UserModel["rut"];
  public uid: UserModel["uid"];
  public role: UserModel["role"];

  private constructor(init: UserModel) {
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

  static getSchema() {
    return UserSchema;
  }

  static validate(item: any): UserModel {
    try {
      const data = UserEntity.mapper(item);
      return UserEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  static responseAdapter(data: any): UserModel[] {
    try {
      return safeArray<UserModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de usuarios"
      }).map(UserEntity.validate);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "user-entity.ts (responseAdapter)")
      );
    }
  }

  private static mapper(item: any): UserModel {
    return {
      email: item?.email ?? "sin correo",
      uid: item?.uid ?? "sin uid",
      rut: item?.rut ?? "sin rut",
      names: item?.names ?? "sin nombres",
      last_names: item?.last_names ?? "sin apellidos",
      is_admin: item?.is_admin ?? false,
      phone: item?.phone ?? "sin teléfono",
      password: item?.password ?? "",
      role_id: item?.role_id ?? 0,
      role: RoleEntity.validate(item?.role),
      id: item?.id ?? null
    };
  }
}

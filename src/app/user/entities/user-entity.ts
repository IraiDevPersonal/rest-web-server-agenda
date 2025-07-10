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
  role: z.optional(RoleEntity.getSchema()),
});

type UserModel = z.infer<typeof UserSchema>;

export class UserEntity {
  public id?: UserModel["id"]
  public email: UserModel["email"]
  public is_admin: UserModel["is_admin"]
  public last_names: UserModel["last_names"]
  public names: UserModel["names"]
  public password: UserModel["password"]
  public phone: UserModel["phone"]
  public role_id: UserModel["role_id"]
  public rut: UserModel["rut"]
  public uid: UserModel["uid"]
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

  static validate(item: any): UserEntity {
    try {
      const data = UserEntity.itemAdapter(item);
      const user = UserEntity.getSchema().parse(data);
      return new UserEntity(user);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  static responseAdapter(data: any): UserEntity[] {
    try {
      return safeArray<UserEntity>(data, {
        throwErrors: true,
        errorMessage: "user-entity.ts: (responseAdapter) Se esperaba un arreglo"
      }).map(UserEntity.validate)
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error))
    }
  }

  private static itemAdapter(item: any): UserModel {
    return {
      email: item["email"],
      uid: item["uid"],
      rut: item["rut"],
      names: item["names"],
      last_names: item["last_names"],
      is_admin: item["is_admin"],
      phone: item["phone"],
      password: item["password"],
      role_id: item["role_id"],
      role: RoleEntity.validate(item["role"]),
    }
  }
}

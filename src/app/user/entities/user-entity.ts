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
});

type Init = z.infer<typeof UserSchema> & {
  role: RoleEntity;
};

export class UserEntity {
  public id?: Init["id"]
  public email: Init["email"]
  public is_admin: Init["is_admin"]
  public last_names: Init["last_names"]
  public names: Init["names"]
  public password: Init["password"]
  public phone: Init["phone"]
  public role_id: Init["role_id"]
  public rut: Init["rut"]
  public uid: Init["uid"]
  public role: Init["role"];

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

  static validate(object: any): UserEntity {
    try {
      const { role, ...user } = object;
      const userScheme = this.getSchema().parse(user);
      const roleSchema = RoleEntity.validate(role);
      return new UserEntity({ ...userScheme, role: roleSchema });
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  static responseAdapter(data: any): UserEntity[] {
    try {
      if (!Array.isArray(data)) {
        throw new Error("user-entity.ts: (responseAdapter) Se esperaba un arreglo");
      }

      return safeArray<UserEntity>(data).map(this.validate)
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error))
    }
  }

  static getSchema() {
    return UserSchema;
  }
}

import { z } from "zod";

import { ProfessionEntity } from "@/app/profession/entities/profession-entity";
import { RoleEntity } from "@/app/role/entities/role-entity";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { Uid } from "@/lib/uid";

const ProfessionalSchema = z.object({
  id: z.number().positive(),
  uid: z.string().uuid(),
  rut: z.string(),
  names: z.string(),
  last_names: z.string(),
  phone: z.string(),
  email: z.string().email(),
  role: RoleEntity.getSchema(),
  professions: z.array(ProfessionEntity.getSchema())
});

type ProfessionalModel = z.infer<typeof ProfessionalSchema>;

export class ProfessionalEntity {
  public id: ProfessionalModel["id"];
  public names: ProfessionalModel["names"];
  public uid: ProfessionalModel["uid"];
  public rut: ProfessionalModel["rut"];
  public last_names: ProfessionalModel["last_names"];
  public phone: ProfessionalModel["phone"];
  public email: ProfessionalModel["email"];
  public professions: ProfessionalModel["professions"];
  public role: ProfessionalModel["role"];

  private constructor(init: ProfessionalModel) {
    this.id = init.id;
    this.names = init.names;
    this.uid = init.uid;
    this.rut = init.rut;
    this.last_names = init.last_names;
    this.phone = init.phone;
    this.email = init.email;
    this.role = init.role;
    this.professions = init.professions;
  }

  static getSchema() {
    return ProfessionalSchema;
  }

  static validate(item: any): ProfessionalModel {
    try {
      const data = ProfessionalEntity.mapper(item);
      return ProfessionalEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "profession-entity.ts: (validate)")
      );
    }
  }

  static responseAdapter(data: any): ProfessionalModel[] {
    try {
      return safeArray<ProfessionalModel>(data, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de profesionales"
      }).map(ProfessionalEntity.validate);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (responseAdapter)"
      );

      throw new Error(errorMessage);
    }
  }

  private static mapper(item: any): ProfessionalModel {
    const user = item?.user;

    return {
      id: user?.id ?? null,
      names: user?.names ?? "sin nombres",
      uid: user?.uid ?? Uid.createV4(),
      rut: user?.rut ?? "sin rut",
      last_names: user?.last_names ?? "sin apellidos",
      phone: user?.phone ?? "sin teléfono",
      email: user?.email ?? "sin correo",
      role: RoleEntity.validate(user?.role),
      professions: ProfessionEntity.toArray(item?.professional_profession)
    };
  }
}

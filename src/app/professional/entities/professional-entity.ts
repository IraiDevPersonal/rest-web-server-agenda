import { z } from "zod";

import { ProfessionEntity } from "@/app/profession/entities/profession-entity";
import { RoleEntity } from "@/app/role/entities/role-entity";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

const ProfessionalSchema = z.object({
  id: z.number().positive(),
  uid: z.string().uuid(),
  rut: z.string(),
  names: z.string(),
  last_names: z.string(),
  phone: z.string(),
  email: z.string().email(),
  professions: z.array(ProfessionEntity.getSchema()),
  role: RoleEntity.getSchema(),
});

type ProfessionalModel = z.infer<typeof ProfessionalSchema>;

export class ProfessionalEntity {
  public id: ProfessionalModel["id"]
  public names: ProfessionalModel["names"]
  public uid: ProfessionalModel["uid"]
  public rut: ProfessionalModel["rut"]
  public last_names: ProfessionalModel["last_names"]
  public phone: ProfessionalModel["phone"]
  public email: ProfessionalModel["email"]
  public professions: ProfessionalModel["professions"]
  public role: ProfessionalModel["role"]

  private constructor(init: ProfessionalModel) {
    this.id = init.id ? Number(init.id) : init.id;
    this.names = String(init.names);
    this.uid = String(init.uid);
    this.rut = String(init.rut);
    this.last_names = String(init.last_names);
    this.phone = String(init.phone);
    this.email = String(init.email);
    this.role = RoleEntity.validate(init.role);
    this.professions = init.professions.map(ProfessionEntity.validate);
  }

  static getSchema() {
    return ProfessionalSchema
  }

  static validate(item: any): ProfessionalModel {
    try {
      const data = ProfessionalEntity.itemAdapter(item);
      return ProfessionalEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (validate) error inesperado"));
    }
  }

  static responseAdapter(data: any): ProfessionalModel[] {
    try {
      return safeArray<ProfessionalModel>(data, {
        throwErrors: true,
        errorMessage: "profession-entity.ts: (responseAdapter) Se esperaba un arreglo",
      }).map(item => ProfessionalEntity.validate(item));
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (responseAdapter) error inesperado"
      );

      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): ProfessionalEntity {
    const user = item["user"];
    const role = user?.["role"];
    const professions = safeArray<any>(item["professional_profession"]);

    return new ProfessionalEntity({
      id: user?.["id"],
      names: user?.["names"],
      uid: user?.["uid"],
      rut: user?.["rut"],
      last_names: user?.["last_names"],
      phone: user?.["phone"],
      email: user?.["email"],
      role: {
        id: role?.["id"],
        name: role?.["name"]
      },
      professions: professions.map(p => ({
        id: p?.["professions"]?.["id"],
        name: p?.["professions"]?.["name"],
      })),
    });
  }
}

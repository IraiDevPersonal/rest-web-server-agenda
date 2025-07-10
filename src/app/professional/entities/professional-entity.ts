import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { RoleEntity } from "@/app/role/entities/role-entity";
import { ProfessionEntity } from "@/app/profession/entities/profession-entity";

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
    this.id = init.id;
    this.names = init.names;
    this.uid = init.uid;
    this.rut = init.rut;
    this.last_names = init.last_names;
    this.phone = init.phone;
    this.email = init.email;
    this.professions = init.professions;
    this.role = init.role;
  }

  static getSchema() {
    return ProfessionalSchema
  }

  static validate(item: any): ProfessionalEntity {
    try {
      const data = ProfessionalEntity.itemAdapter(item);
      const professional = ProfessionalEntity.getSchema().parse(data);
      return new ProfessionalEntity(professional);
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(
        error,
        "profession--entity.ts: (validate) error inesperado"));
    }
  }

  static responseAdapter(data: any): ProfessionalEntity[] {
    try {
      return safeArray<ProfessionalEntity>(data).map(item => ProfessionalEntity.validate(item));
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (responseAdapter) error inesperado"
      );

      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): ProfessionalModel {
    const user = item["user"];
    const role = user?.["role"];
    const professions = safeArray<any>(item["professional_profession"]);

    return {
      id: Number(user?.["id"]),
      names: user?.["names"],
      uid: user?.["uid"],
      rut: user?.["rut"],
      last_names: user?.["last_names"],
      phone: user?.["phone"],
      email: user?.["email"],
      role: {
        id: Number(role?.["id"]),
        name: role?.["name"]
      },
      professions: professions.map(p => ({
        id: Number(p?.["professions"]?.["id"]),
        name: p?.["professions"]?.["name"],
      })),
    };
  }
}

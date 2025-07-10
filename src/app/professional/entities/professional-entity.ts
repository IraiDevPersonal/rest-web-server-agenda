import { CustomError } from "@/lib/custom-error";
import { Uid } from "@/lib/uid";
import { isValidObject, safeArray } from "@/lib/utils";

type Init = {
  id: number;
  names: string;
  uid: string
  rut: string;
  last_names: string;
  phone: string
  email: string
  professions: { id: number, name: string }[]
  role: { id: number, name: string }
}

export class ProfessionalEntity {
  public id: Init["id"]
  public names: Init["names"]
  public uid: Init["uid"]
  public rut: Init["rut"]
  public last_names: Init["last_names"]
  public phone: Init["phone"]
  public email: Init["email"]
  public professions: Init["professions"]
  public role: Init["role"]


  private constructor(init: Init) {
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

  static responseAdapter(data: any): ProfessionalEntity[] {
    try {
      return safeArray<ProfessionalEntity>(data).map(ProfessionalEntity.itemAdapter);
    } catch (error) {
      const errorMessage = CustomError.getErrorMessage(
        error,
        "profession-entity.ts: (responseAdapter) error inesperado"
      );

      throw new Error(errorMessage);
    }
  }

  private static itemAdapter(item: any): ProfessionalEntity {
    const message = "profession-entity.ts: (itemAdapter) entreada no esperada, se esperaba un objeto"

    if (!isValidObject(item, message)) {
      throw new Error(message);
    }

    const user = item["user"]
    const role = user?.["role"]
    const professions = item["professional_profession"] ?? []

    return {
      id: Number(user?.["id"]),
      names: user?.["names"] ?? "Sin nombres",
      uid: user?.["uid"] ?? Uid.createV4(),
      rut: user?.["rut"] ?? "Sin rut",
      last_names: user?.["last_names"] ?? "Sin apellidos",
      phone: user?.["phone"] ?? "Sin telefono",
      email: user?.["email"] ?? "Sin correo",
      role: {
        id: role?.["id"],
        name: role?.["name"] ?? "indeterminado"
      },
      professions: professions.map((p: any) => ({
        id: p?.["professions"]?.["id"],
        name: p?.["professions"]?.["name"] ?? "Sin nombre"
      }))
    };
  }
}

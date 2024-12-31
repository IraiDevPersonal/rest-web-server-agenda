import { CustomError } from "../../../core/domain/custom.error";
import { roleSchema } from "../../presentation/schemas/roles_schema";

type Init = {
  id: number;
  name: string;
};

export class RoleModel {
  private id: number;
  private name: string;

  private constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = roleSchema.parse(object);
      return new RoleModel(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

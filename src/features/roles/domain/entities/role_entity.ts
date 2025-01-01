import { CustomError } from "../../../core/domain/custom.error";
import { roleSchema } from "../../presentation/schemas/roles_schema";

type Init = {
  id: number | undefined;
  name: string;
};

export class RoleEntity {
  public id: number | undefined;
  private name: string;

  private constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = roleSchema.parse(object);
      return new RoleEntity(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

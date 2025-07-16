import { CustomError } from "@core/domain/custom.error";
import { roleSchema } from "@roles/presentation/schemas/roles_schema";

type Init = {
  id?: number | undefined;
  name: string;
};

export class RoleMapper {
  public id?: number | undefined;
  public name: string;

  private constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
  }

  static toResponse(object: Record<string, any>): RoleMapper {
    return {
      id: object?.["id"],
      name: object["name"]
    };
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = roleSchema.parse(object);
      return new RoleMapper(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

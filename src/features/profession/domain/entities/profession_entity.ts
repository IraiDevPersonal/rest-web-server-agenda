import { z } from "zod";
import { CustomError } from "../../../core/domain/custom.error";

const scheme = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Minimo de caracteres es 1" }),
});

type Init = {
  id?: number | undefined;
  name: string;
};

export class ProfessionEntity {
  public id?: number | undefined;
  public name: string;

  public constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = scheme.parse(object);
      return new ProfessionEntity(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

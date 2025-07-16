import { z } from "zod";
import { CustomError } from "@core/domain/custom.error";

const scheme = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Minimo de caracteres es 1" })
});

type Init = {
  id?: number | undefined;
  name: string;
};

export class ProfessionMapper {
  public id?: number | undefined;
  public name: string;

  public constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
  }

  static adapter(object: Record<string, any>) {
    return {
      id: object["id"],
      name: object["name"]
    };
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = scheme.parse(object);
      return new ProfessionMapper(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }

  static insertDTO(object: Record<string, any>) {
    const model = ProfessionMapper.fromJson(object);
    delete model.id;
    return model;
  }

  static updateDTO(object: Record<string, any>) {
    const model = ProfessionMapper.fromJson(object);

    if (!model.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }
    return { data: model, id: model.id };
  }
}

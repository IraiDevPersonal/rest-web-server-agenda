import { z } from "zod";
import { ServiceProviderCodesEntity } from "./serviceProviderCodes_entity";
import { CustomError } from "../../../core/domain/custom.error";

const scheme = z.object({
  id: z.number().optional(),
  name: z.string(),
  rut: z.string().max(12, { message: "Máximo de caracteres es 12" }),
});

type Init = {
  id?: number | undefined;
  name: string;
  rut: string;
  serviceProviderCode: ServiceProviderCodesEntity[] | undefined;
};

export class ServiceProviderEntity {
  public id?: number | undefined;
  public name: string;
  public rut: string;
  public serviceProviderCode: ServiceProviderCodesEntity[] | undefined;

  public constructor(init: Init) {
    this.id = init.id;
    this.name = init.name;
    this.rut = init.rut;
    this.serviceProviderCode = init.serviceProviderCode;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const { serviceProviderCode } = object;
      const schema = scheme.parse(object);
      return new ServiceProviderEntity({ ...schema, serviceProviderCode });
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

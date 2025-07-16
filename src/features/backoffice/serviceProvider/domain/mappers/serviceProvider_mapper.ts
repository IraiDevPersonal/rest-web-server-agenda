import { z } from "zod";
import { ServiceProviderCodesMapper } from "./serviceProviderCodes_Mapper";
import { CustomError } from "@core/domain/custom.error";

const scheme = z.object({
  id: z.number().optional(),
  name: z.string(),
  rut: z.string().max(12, { message: "Máximo de caracteres es 12" })
});

type Init = {
  id?: number | undefined;
  name: string;
  rut: string;
  serviceProviderCode: ServiceProviderCodesMapper[] | undefined;
};

export class ServiceProviderMapper {
  public id?: number | undefined;
  public name: string;
  public rut: string;
  public serviceProviderCode: ServiceProviderCodesMapper[] | undefined;

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
      return new ServiceProviderMapper({ ...schema, serviceProviderCode });
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }

  static toResponse(object: Record<string, any>) {
    return {
      id: object?.["id"],
      name: object?.["name"] ?? "",
      rut: object?.["rut"] ?? "",
      serviceProviderCode:
        object?.["serviceProviderCode"]?.map(
          ServiceProviderCodesMapper.toResponse
        ) ?? []
    };
  }
}

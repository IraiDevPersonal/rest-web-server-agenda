import { z } from "zod";
import { CustomError } from "../../../core/domain/custom.error";

const scheme = z.object({
  id: z.number().optional(),
  code: z.string(),
  title: z.string(),
  serviceProviderId: z.number(),
});

type Init = {
  id?: number | undefined;
  code: string;
  title: string;
  serviceProviderId: number;
};

export class ServiceProviderCodesEntity {
  public id?: number | undefined;
  public code: string;
  public title: string;
  public serviceProviderId: number;

  public constructor(init: Init) {
    this.id = init.id;
    this.code = init.code;
    this.title = init.title;
    this.serviceProviderId = init.serviceProviderId;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = scheme.parse(object);
      return new ServiceProviderCodesEntity(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

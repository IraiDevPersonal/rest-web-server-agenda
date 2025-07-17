import { CustomError } from "@/lib/custom-error";
import {
  ServiceProviderModel,
  ServiceProviderScheme
} from "../models/service-provider";
import { ServiceProviderCodesMapper } from "./service-provider-codes-mapper";

export class ServiceProviderMapper {
  static validate(item: any): ServiceProviderModel {
    try {
      const data = ServiceProviderMapper.mapper(item);
      return ServiceProviderScheme.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "service-provider-mapper.ts (validate)"
        )
      );
    }
  }

  static mapper(item: any): ServiceProviderModel {
    return {
      id: item?.id,
      rut: item?.rut ?? "sin rut",
      name: item?.name ?? "sin nombre",
      serviceProviderCode: ServiceProviderCodesMapper.toArray(
        item?.serviceProviderCode
      )
    };
  }
}

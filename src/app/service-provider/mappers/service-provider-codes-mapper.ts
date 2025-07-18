import { CustomError } from "@/lib/custom-error";
import {
  type ServiceProviderCodesModel,
  ServiceProviderCodesScheme
} from "../models/service-provider-codes";
import { safeArray } from "@/lib/utils";
import { BdServiceProviderCodes } from "@/types/bd-model";

export class ServiceProviderCodesMapper {
  static validate(item: BdServiceProviderCodes): ServiceProviderCodesModel {
    try {
      const data = ServiceProviderCodesMapper.mapper(item);
      return ServiceProviderCodesScheme.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "service-provider-codes-mapper.ts (validate)"
        )
      );
    }
  }

  static toArray(data: BdServiceProviderCodes[]): ServiceProviderCodesModel[] {
    return safeArray(data, {
      errorMessage:
        "service-provider-codes-mapper.ts (toArray): se esperaba un array"
    }).map(ServiceProviderCodesMapper.validate);
  }

  static mapper(item: BdServiceProviderCodes): ServiceProviderCodesModel {
    return {
      id: item.id,
      code: item.code,
      title: item.title,
      service_provider_id: item.service_provider_id
    };
  }
}

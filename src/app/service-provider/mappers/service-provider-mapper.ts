import { CustomError } from "@/lib/custom-error";
import {
  ServiceProviderModel,
  ServiceProviderScheme
} from "../models/service-provider";
import { ServiceProviderCodesMapper } from "./service-provider-codes-mapper";
import { BdServiceProviders } from "@/types/bd-model";

type BdServiceProviderWithServiceCodes = BdServiceProviders<{
  include: {
    service_provider_codes: true;
  };
}>;

export class ServiceProviderMapper {
  static validate(
    item: BdServiceProviderWithServiceCodes
  ): ServiceProviderModel {
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

  static mapper(item: BdServiceProviderWithServiceCodes): ServiceProviderModel {
    return {
      id: item.id,
      rut: item.rut,
      name: item.name,
      service_provider_codes: ServiceProviderCodesMapper.toArray(
        item.service_provider_codes
      )
    };
  }
}

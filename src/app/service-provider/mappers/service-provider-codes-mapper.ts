import { CustomError } from "@/lib/custom-error";
import {
  type ServiceProviderCodesModel,
  ServiceProviderCodesScheme
} from "../models/service-provider-codes";
import { safeArray } from "@/lib/utils";

export class ServiceProviderCodesMapper {
  static validate(item: Record<string, any>): ServiceProviderCodesModel {
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

  static toArray(data: any): ServiceProviderCodesModel[] {
    try {
      return safeArray<ServiceProviderCodesModel>(data, {
        throwErrors: true,
        errorMessage: "se esperaba un arreglo de service provider codes"
      }).map(ServiceProviderCodesMapper.validate);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "service-provider-codes-mapper.ts (toArray)"
        )
      );
    }
  }

  static mapper(item: any): ServiceProviderCodesModel {
    return {
      id: item?.id,
      code: item?.code,
      title: item?.title,
      serviceProviderId: item?.serviceProviderId
    };
  }
}

import { z } from "zod";
import { ServiceProviderCodesScheme } from "./service-provider-codes";

export const ServiceProviderScheme = z.object({
  id: z.number().positive().optional(),
  name: z.string(),
  rut: z.string().max(12, { message: "Máximo de caracteres es 12" }),
  service_provider_codes: z.array(ServiceProviderCodesScheme)
});

export type ServiceProviderModel = z.infer<typeof ServiceProviderScheme>;

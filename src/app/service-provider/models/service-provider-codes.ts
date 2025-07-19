import { z } from "zod";

export const ServiceProviderCodesScheme = z.object({
  id: z.number().optional(),
  code: z.string(),
  title: z.string(),
  service_provider_id: z.number().optional()
});

export type ServiceProviderCodesModel = z.infer<
  typeof ServiceProviderCodesScheme
>;

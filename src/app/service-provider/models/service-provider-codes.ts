import { z } from "zod";

export const ServiceProviderCodesScheme = z.object({
  id: z.number().optional(),
  code: z.string(),
  title: z.string(),
  serviceProviderId: z.number()
});

export type ServiceProviderCodesModel = z.infer<
  typeof ServiceProviderCodesScheme
>;

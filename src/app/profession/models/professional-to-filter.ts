import { z } from "zod";

import { OptionSchema } from "@/lib/schemas/global";

export type ProfessionOptionModel = z.infer<typeof OptionSchema>;

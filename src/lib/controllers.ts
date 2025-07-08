import { Request } from "express";

export type Controllers<T extends object> = {
  getFilters(request: Request): T;
}

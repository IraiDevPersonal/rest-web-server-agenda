import { Request } from 'express';

export interface Controllers {
  getFilters(request: Request): Record<string, any>;
}

import z from "zod";
import { PaginatedQuery } from "@/types/global";
import { CustomError } from "./custom-error";

const PaginationSchema = z.object({
  page: z.number().positive().min(1).optional().default(1),
  limit: z.number().positive().min(1).max(100).optional().default(10)
});

export class Pagination {
  readonly page: number;
  readonly limit: number;

  constructor({ limit, page }: { page?: number; limit?: number }) {
    const { success, error, data } = PaginationSchema.safeParse({ page, limit });

    if (!success) {
      throw CustomError.genericError(
        error,
        "Pagination validation error: page must be >= 1 and limit must be between 1-100"
      );
    }

    this.page = data.page;
    this.limit = data.limit;
  }

  withFilters<T extends object>(filters: T): PaginatedQuery<T> {
    return {
      skip: this.getOffset(),
      take: this.limit,
      ...filters
    };
  }

  getTotalPages(total: number) {
    return Math.ceil(total / this.limit) || 1;
  }

  getOffset(): number {
    return (this.page - 1) * this.limit;
  }

  // extras por si lo necesitamos
  //  getMetadata(total: number): PaginationResult {
  //   const totalPages = this.getTotalPages(total);

  //   return {
  //     page: this.page,
  //     limit: this.limit,
  //     total,
  //     totalPages,
  //     hasNext: this.page < totalPages,
  //     hasPrevious: this.page > 1
  //   };
  // }
}

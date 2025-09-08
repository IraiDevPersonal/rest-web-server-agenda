import { Pagination } from "@/lib/pagination";
import { queryParser } from "@/lib/utils";
import type { Request } from "express";
import { UserMapper } from "../mappers/user.mapper";
import type { UserFilters } from "../models/user-filters.model";
import type { UserServiceRepository } from "../repository";

export class UserListUseCase<T extends UserServiceRepository = UserServiceRepository> {
  protected readonly service: T;

  constructor(service: T) {
    this.service = service;
  }

  protected buildFilters = (query: Request["query"]): UserFilters => {
    const { id, names, last_names, rut, page, limit } = query;

    return queryParser({ id, names, last_names, rut, page, limit }, { limit: "10", page: "1" });
  };

  list = async (query: Request["query"]) => {
    const { page, limit, ...filters } = this.buildFilters(query);
    const pagination = new Pagination({ page, limit });

    const { data, total } = await this.service.getAll(pagination.withFilters(filters));

    return UserMapper.fromBdToDomain({
      data,
      total,
      page: pagination.page,
      limit: pagination.limit,
      pages: pagination.getTotalPages(total)
    });
  };
}

import { queryParser } from "@/lib/utils";
import { Request } from "express";
import { UserForFiltersMapper } from "../mappers/user-for-filters.mapper";
import { UserMapper } from "../mappers/user.mapper";
import { UserFilters } from "../models/user-filters.model";
import { UserServiceImpl } from "../service";
import { Pagination } from "@/lib/pagination";

export class UserListUseCase {
  private readonly service: UserServiceImpl;

  constructor(service: UserServiceImpl) {
    this.service = service;
  }

  list = async (query: Request["query"]) => {
    const { page, limit, ...filters } = this.buildFilters(query);
    const pagination = new Pagination({ page, limit });

    const { data, total } = await this.service.getUsers(pagination.withFilters(filters));

    return UserMapper.fromBdToDomain({
      data,
      total,
      page: pagination.page,
      limit: pagination.limit,
      pages: pagination.getTotalPages(total)
    });
  };

  listForFilters = async () => {
    const bdUsers = await this.service.getUsersForFilters();

    return UserForFiltersMapper.fromBdToDomain(bdUsers);
  };

  private buildFilters = (query: Request["query"]): UserFilters => {
    const { id, names, last_names, rut, page, limit } = query;

    return queryParser({ id, names, last_names, rut, page, limit }, { limit: "10", page: "1" });
  };
}

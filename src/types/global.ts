export type ResponseWithPagination<T> = {
  total: number;
  page: number;
  pages: number;
  limit: number;
  data: T[];
};

export type UpsertResponse<T> = {
  data?: T;
};

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type MakeRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;

export type Option<T extends object = object> = {
  value: string;
  label: string;
} & T;

export type PaginatedResult = { data: unknown[]; total: number };

export type PaginatedQuery<T extends object = object> = {
  skip: number;
  take: number;
} & T;

export type RutOrEmailQuery = Partial<{ rut: string; email: string; uid: string }>;

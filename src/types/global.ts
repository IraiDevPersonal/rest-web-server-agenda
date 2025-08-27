export type ResponseWithPagination<T extends object> = {
  total: number;
  page: number;
  pages: number;
  limit: number;
  data: T[];
};

export type UpsertResponse<T extends object> = {
  data?: T;
  message: string;
};

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type MakeRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;

export type Option<T extends object = object> = {
  value: string;
  label: string;
} & T;

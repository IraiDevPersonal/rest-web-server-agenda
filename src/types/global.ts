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

export type StrictRequired<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>;
};

export type StringifyObject<T> = {
  [K in keyof T]: string;
};

export type UndefinedObject<T> = {
  [K in keyof T]: T[K] | undefined;
};

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type MakeRequired<T, K extends keyof T> = Partial<Omit<T, K>> &
  Required<Pick<T, K>>;

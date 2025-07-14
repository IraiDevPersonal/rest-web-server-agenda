export type StrictRequired<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>;
};

export type StringifyObject<T> = {
  [K in keyof T]: string;
};

export type UndefinedObject<T> = {
  [K in keyof T]: T[K] | undefined;
};

import queryString from "query-string";

type YearMonth = `${number}-${Month}`;
type Month =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";

export function isYearMonth(value: string | undefined): value is YearMonth {
  if (value === undefined) return false;
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
}

export function safeArray<T = any>(
  data: any,
  options?: { throwErrors?: boolean; errorMessage?: string }
): T[] {
  const errorMessage = options?.errorMessage || "Se esperaba un array";

  if (Array.isArray(data)) {
    return data as T[];
  }

  if (options?.throwErrors) {
    throw new Error(errorMessage);
  }

  console.error(errorMessage);
  return [] as T[];
}

export function parseQuery<T extends object>(value: T, defaultValues?: Partial<T>) {
  const stringifyQuery = queryString.stringify(
    { ...value, ...defaultValues },
    {
      skipEmptyString: true,
      skipNull: true
    }
  );

  return queryString.parse(stringifyQuery, {
    arrayFormat: "bracket-separator",
    arrayFormatSeparator: ",",
    parseBooleans: true,
    parseNumbers: true
  }) as Record<keyof T, any>;
}

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

export function safeArray<T>(
  data: unknown,
  options?: { throwErrors?: boolean; errorMessage?: string }
): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }

  if (options?.throwErrors) {
    throw new Error(options.errorMessage || "Se esperaba un array");
  }

  return [];
}

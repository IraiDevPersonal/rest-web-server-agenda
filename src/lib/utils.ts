type YearMonth = `${number}-${Month}`
type Month =
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12";

export function isYearMonth(value: string | undefined): value is YearMonth {
  if (value === undefined) return false
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
}

export function isValidObject(value: any | undefined, warningMessage: string) {
  if (typeof value !== "object" || Array.isArray(value)) {
    console.warn(warningMessage);
    return false;
  }
  return true;
}

export function safeArray<T>(data: any): T[] {
  return (Array.isArray(data) ? data : []) as T[];
}
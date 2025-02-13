import dayjs from "dayjs";

const dateFormat: { ymd: string; dmy: string } = {
  ymd: "YYYY-MM-DD",
  dmy: "DD-MM-YYYY",
};

type formatType = typeof dateFormat;

export class DateFormatter {
  static formatDate(date: Date | string, format: keyof formatType): string {
    return dayjs(date).format(dateFormat[format]);
  }
}

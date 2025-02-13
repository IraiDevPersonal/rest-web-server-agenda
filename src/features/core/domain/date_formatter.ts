import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const dateFormat: { ymd: string; dmy: string } = {
  ymd: "YYYY-MM-DD",
  dmy: "DD-MM-YYYY",
};

type formatType = typeof dateFormat;

export class DateFormatter {
  static formatDate(date: Date | string, format: keyof formatType): string {
    return dayjs.utc(date).format(dateFormat[format]);
  }

  static stringToDate(date: string): Date {
    return dayjs(date).toDate();
  }
}

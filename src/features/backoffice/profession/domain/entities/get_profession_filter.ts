import { FilterInit } from "@core/domain/filters";

export class GetProfessionFilter {
  public value: string;
  public label: string;

  private constructor(init: FilterInit) {
    this.value = `${init.value}`;
    this.label = init.label;
  }

  static fromObject(object: Record<string, any>) {
    const entity = GetProfessionFilter.adapter(object);

    return new GetProfessionFilter(entity);
  }

  static adapter(object: Record<string, any>) {
    return {
      value: object["id"],
      label: object["name"],
    };
  }
}

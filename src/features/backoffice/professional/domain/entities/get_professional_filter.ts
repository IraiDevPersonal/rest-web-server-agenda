import { FilterInit } from "@core/domain/filters";

export type ProfessionalFilter = FilterInit & {
  professions: string[];
};

export class GetProfessionalFilter {
  public value: string;
  public label: string;
  public professions: string[];

  private constructor(init: ProfessionalFilter) {
    this.value = `${init.value}`;
    this.label = init.label;
    this.professions = init.professions;
  }

  static fromObject(object: Record<string, any>) {
    const professional = GetProfessionalFilter.adapter(object);

    return new GetProfessionalFilter(professional);
  }

  static adapter(object: Record<string, any>) {
    return {
      value: object["id"],
      label: `${object["user"]["names"]} ${object["user"]["last_names"]}`,
      professions:
        object["professional_profession"]?.map(
          (profession: any) => profession["profession_id"]
        ) ?? [],
    };
  }
}

type Init = {
  value: number;
  label: string;
};

export class GetProfessionalFilter {
  public value: string;
  public label: string;

  private constructor(init: Init) {
    this.value = `${init.value}`;
    this.label = init.label;
  }

  static fromObject(object: Record<string, any>) {
    const professional = GetProfessionalFilter.adapter(object);

    return new GetProfessionalFilter(professional);
  }

  static adapter(object: Record<string, any>) {
    return {
      value: object["id"],
      label: `${object["user"]["names"]} ${object["user"]["lasst_names"]}`,
    };
  }
}

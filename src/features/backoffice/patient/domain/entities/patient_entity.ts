import { CustomError } from '@core/domain/custom.error';
import { patientSchema } from '@patients/presentation/schemas/patient_schema';

type Init = {
  id?: number | undefined;
  uid?: string | undefined;
  rut: string;
  names: string;
  last_names: string;
  email: string;
  phone: string;
  address: string;
  is_deleted: boolean;
};

export class PatientEntity {
  public id?: number | undefined;
  public uid?: string | undefined;
  public rut: string;
  public names: string;
  public last_names: string;
  public email: string;
  public phone: string;
  public address: string;
  public is_deleted: boolean;

  private constructor(init: Init) {
    this.id = init.id;
    this.uid = init.uid;
    this.rut = init.rut;
    this.names = init.names;
    this.last_names = init.last_names;
    this.email = init.email;
    this.phone = init.phone;
    this.address = init.address;
    this.is_deleted = init.is_deleted;
  }

  static adapter(object: Record<string, any>): PatientEntity {
    return {
      id: object?.['id'],
      uid: object?.['uid'] ?? '',
      rut: object?.['rut'] ?? '',
      names: object?.['names'] ?? '',
      last_names: object?.['last_names'] ?? '',
      email: object?.['email'] ?? '',
      phone: object?.['phone'] ?? '',
      address: object?.['address'] ?? '',
      is_deleted: object?.['is_deleted'] ?? false
    };
  }
  static fromJson(object: Record<string, any>) {
    try {
      const schema = patientSchema.parse(PatientEntity.adapter(object));
      return new PatientEntity(schema);
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }
}

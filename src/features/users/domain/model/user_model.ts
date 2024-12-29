import { RoleModel } from "../../../roles/domain/models/role_model";

export interface UserModel {
  id: number;
  uid: string;
  rut: string;
  names: string;
  last_names: string;
  email: string;
  password: string;
  is_admin: boolean;
  phone: string;
  role_id: number;
  role: RoleModel;
}

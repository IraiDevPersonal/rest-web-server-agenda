import { AppointmentStatusModel } from "../../../appointment-status/domain/model/appointment-status_model";
import { PatientEntity } from "../../../patients/domain/entities/patient_entity";
import { ScheduleModel } from "../../../schedule/domain/entities/schedule_entity";

export interface AppointmentModel {
  id: number;
  patient_id: number;
  schedule_id: number;
  appointment_status_id: number;
  patient: PatientEntity;
  appointmentStatus: AppointmentStatusModel;
  schedule: ScheduleModel;
}

import { AppointmentStatusModel } from "../../../appointment-status/domain/model/appointment-status_model";
import { PatientModel } from "../../../patients/domain/models/patient_model";
import { ScheduleModel } from "../../../schedule/domain/model/schedule_model";

export interface AppointmentModel {
  id: number;
  patient_id: number;
  schedule_id: number;
  appointment_status_id: number;
  patient: PatientModel;
  appointmentStatus: AppointmentStatusModel;
  schedule: ScheduleModel;
}

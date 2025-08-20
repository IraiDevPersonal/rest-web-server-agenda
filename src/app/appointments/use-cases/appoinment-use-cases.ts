import { Request } from "express";
import { AppointmentDetailMapper } from "../mappers/appointment-detail-mapper";
import { AppointmentMapper } from "../mappers/appointment-mapper";
import { AppointmentModel } from "../models/appointment-model";
import { AppointmentService } from "../service";
import { AppointmentValidations } from "../validations/appointment-validations";

export class AppointmentUseCases {
  public constructor(private readonly service: AppointmentService) {}

  getAppointments = async (query: Request["query"]): Promise<AppointmentModel[]> => {
    const filters = AppointmentMapper.getFilters(query);
    const bdAppointments = await this.service.getAppointments(filters);
    return AppointmentMapper.response(bdAppointments);
  };

  getAppointmentDetail = async (uid: string) => {
    let bdAppoitnment = await this.service.getAppointmentDetail(uid);
    bdAppoitnment = AppointmentValidations.appointmentExists(bdAppoitnment, uid);

    return AppointmentDetailMapper.response(bdAppoitnment);
  };
}

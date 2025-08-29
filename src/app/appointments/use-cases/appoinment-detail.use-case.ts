import { AppointmentDetailMapper } from "../mappers/appointment-detail.mapper";
import { AppointmentServiceImpl } from "../service";
import { AppointmentValidation } from "../validations/appointment.validation";

export class AppointmentDetailUseCase {
  private readonly service: AppointmentServiceImpl;

  public constructor(service: AppointmentServiceImpl) {
    this.service = service;
  }

  getDetail = async (uid: string) => {
    const bdAppoitnment = await this.service.getAppointmentByUid(uid);
    const validAppointment = AppointmentValidation.exist(bdAppoitnment, uid);

    return AppointmentDetailMapper.fromBdToDomain(validAppointment);
  };
}

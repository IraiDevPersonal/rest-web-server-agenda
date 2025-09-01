import { AppointmentDetailMapper } from "../mappers/appointment-detail.mapper";
import { AppointmentServiceImpl } from "../service";
import { AppointmentValidations } from "../validations";

export class AppointmentDetailUseCase {
  private readonly service: AppointmentServiceImpl;

  public constructor(service: AppointmentServiceImpl) {
    this.service = service;
  }

  getDetail = async (uid: string) => {
    const bdAppoitnment = await this.service.getAppointmentByUid(uid);
    const validAppointment = AppointmentValidations.requireExists(bdAppoitnment);

    return AppointmentDetailMapper.fromBdToDomain(validAppointment);
  };
}

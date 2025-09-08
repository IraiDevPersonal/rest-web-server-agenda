import { AppointmentDetailMapper } from "../mappers/appointment-detail.mapper";
import type { AppointmentServiceRepository } from "../repository";
import { AppointmentValidations } from "../validations";

export class AppointmentDetailUseCase {
  private readonly service: AppointmentServiceRepository;

  public constructor(service: AppointmentServiceRepository) {
    this.service = service;
  }

  getDetail = async (uid: string) => {
    const bdAppoitnment = await this.service.getAppointmentByUid(uid);
    const validAppointment = AppointmentValidations.requireExists(bdAppoitnment);

    return AppointmentDetailMapper.fromBdToDomain(validAppointment);
  };
}

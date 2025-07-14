import { Request, Response } from 'express';
import { AppointmentStatus } from '@prisma/client';
import { CustomError } from '@core/domain/custom.error';
import { AgendaService } from '../service/agenda_service';
import { GetMyDay } from '../../domain/entities/get_my_day';
import { DateFormatter } from '@core/domain/date_formatter';
import { Controllers } from '@core/domain/controllers';
import { GetAgendaDetail } from '../../domain/entities/get_agenda_detail';
import { isYearMonth } from '@lib/utils';

export class AgendaController implements Controllers {
  public constructor(private readonly agendaService: AgendaService) {}

  public getMyDay = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const appointments = await this.agendaService.getAppointments(filters);

      const aps = appointments.map(GetMyDay.fromObject);

      return res.status(200).json(aps);
    } catch (error) {
      console.log('catch ', error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };

  public getOneAppointment = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const appoitnment = await this.agendaService.getOneAppointment(uid);

      if (!appoitnment) {
        throw CustomError.badRequest(`No se encontró cita para el UID: ${uid}`);
      }

      const adaptedAppointments = GetAgendaDetail.fromObject(appoitnment);
      return res.status(200).json(adaptedAppointments);
    } catch (error) {
      console.log('catch ', error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };

  // TODO: filtros por IRAIDEV, para mi necesidad actual xD
  // Se agrego la query date_to, que cuando se recibe es para obtener los datos entre un rango desde date hasta date_to, si solo viene date, entonces es para esa fecha en especifico, date_to no deberia llegar sin un date
  // se agrego la query month, llegara en formato yyyy-mm
  public getFilters(req: Request) {
    const {
      date,
      patient_rut,
      professional_id,
      profession_id,
      date_to,
      month
    } = req.query;
    const type = req.params.type ?? req.query.type;

    let queryDate: Date | undefined = date
      ? DateFormatter.stringToDate(date as string)
      : undefined;
    let queryDateFrom: Date | undefined = undefined;
    let queryDateTo: Date | undefined = undefined;

    if (date_to && date) {
      queryDate = undefined;
      queryDateFrom = DateFormatter.stringToDate(date as string);
      queryDateTo = DateFormatter.stringToDate(date_to as string);
    }

    if (isYearMonth(month as string | undefined)) {
      queryDate = undefined;
      const currentDate = `${month}-01`;
      queryDateFrom = DateFormatter.stringToDate(currentDate);
      queryDateTo = DateFormatter.getLastDayOfMonth(currentDate) as Date;
    }

    return {
      date: queryDate,
      date_from: queryDateFrom,
      date_to: queryDateTo,
      patient_rut: patient_rut as string,
      type: type as AppointmentStatus,
      profession_id: profession_id ? Number(profession_id) : undefined,
      professional_id: professional_id ? Number(professional_id) : undefined
    };
  }

  // TODO: version anterior de los filtros
  // public getFilters(req: Request) {
  //   const { date, patient_rut, professional_id, profession_id, month, year } =
  //     req.query;
  //   const type = req.params.type ?? req.query.type;

  //   console.log(req.query)

  //   let dateFrom: Date | undefined;
  //   let dateTo: Date | undefined;
  //   if (month && year) {
  //     dateFrom = DateFormatter.stringToDate(`${year}-${month}-01`);
  //     dateTo = DateFormatter.getLastDayOfMonth(dateFrom) as Date;
  //   }

  //   return {
  //     date: date ? DateFormatter.stringToDate(date as string) : undefined,
  //     patient_rut: patient_rut as string,
  //     type: type as AppointmentStatus,
  //     date_from: dateFrom,
  //     date_to: dateTo,
  //     profession_id: profession_id ? Number(profession_id) : undefined,
  //     professional_id: professional_id ? Number(professional_id) : undefined,
  //   };
  // }
}

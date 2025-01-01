import { Request, Response } from "express";
import { CustomError } from "../../../core/domain/custom.error";

export class AgendaController {
  public getAgenda = async (req: Request, res: Response) => {
    try {
      const { type } = req.params;
      console.log(type);
      return CustomError.badRequest("Err");
    } catch (error) {
      CustomError.internalServer(`${error}`);
    }
  };
}

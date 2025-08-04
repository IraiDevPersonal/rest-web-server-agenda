import { ProfessionMapper } from "@/app/profession/mappers/profession-mapper";
import { RoleMapper } from "@/app/role/mappers/role-mapper";
import {
  type ProfessionalModel,
  type ProfessionalForAppointmentDetailModel,
  ProfessionalForAppointmentDetailSchema,
  ProfessionalSchema
} from "../models/professional";

import { CustomError } from "@/lib/custom-error";
import { parseQuery, safeArray } from "@/lib/utils";
import { BdProfessional } from "@/types/bd-model";
import { Request } from "express";
import { ProfessionalFilters } from "../models/professional-filters";

type BdProfessionalWithRoleAndProfessions = BdProfessional<{
  select: {
    // id: true;
    user: {
      omit: {
        password: true;
        role_id: true;
      };
      include: {
        role: {
          select: {
            name: true;
            id: true;
          };
        };
      };
    };
    professional_profession: {
      select: {
        professions: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
  };
}>;

export class ProfessionalMapper {
  static validate(item: BdProfessionalWithRoleAndProfessions): ProfessionalModel {
    try {
      const data = ProfessionalMapper.mapper(item);
      return ProfessionalSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "professional-mapper.ts: (validate)")
      );
    }
  }

  static response(data: BdProfessionalWithRoleAndProfessions[]): ProfessionalModel[] {
    return safeArray(data, {
      errorMessage: "professional-mapper.ts (response): se esperaba un array"
    }).map(ProfessionalMapper.validate);
  }

  static validateProfessionalForAppointmentDetail(
    item: BdProfessionalWithRoleAndProfessions
  ): ProfessionalForAppointmentDetailModel {
    try {
      const user = item.user;
      const professions = item.professional_profession.map((p) => p.professions.name);
      const data: ProfessionalForAppointmentDetailModel = {
        fullname: `${user.names} ${user.last_names}`,
        professions: professions,
        pay_methods: ["fonasa", "particular (Efectivo, Transferencia)"],
        confirm_methods: ["whatsapp", "teléfono", "correo", "presencial"]
      };

      return ProfessionalForAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "profesional-mapper.ts: (validateProfessionalForAppointmentDetail)"
        )
      );
    }
  }

  static getFilters(query: Request["query"]): ProfessionalFilters {
    const { id, names, last_names, profession_id, rut, page, limit } = query;

    return parseQuery(
      { id, names, last_names, profession_id, rut, page, limit },
      { limit: "10", page: "1" }
    );
  }

  private static mapper(item: BdProfessionalWithRoleAndProfessions): ProfessionalModel {
    const user = item?.user;

    return {
      // id: item.id,
      user_id: user.id,
      names: user.names,
      uid: user.uid,
      rut: user.rut,
      last_names: user.last_names,
      phone: user.phone,
      email: user.email,
      role: RoleMapper.validate(user.role),
      professions: ProfessionMapper.toArray(
        item.professional_profession.map((i) => ({
          id: i.professions.id,
          name: i.professions.name
        }))
      )
    };
  }
}

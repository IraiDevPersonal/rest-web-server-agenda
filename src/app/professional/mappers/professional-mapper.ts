import { ProfessionMapper } from "@/app/profession/mappers/profession-mapper";
import { RoleMapper } from "@/app/role/mappers/role-mapper";
import {
  type ProfessionalForAppointmentDetailModel,
  ProfessionalForAppointmentDetailSchema,
  type ProfessionalModel,
  ProfessionalSchema
} from "../models/professional";

import { CustomError } from "@/lib/custom-error";
import { parseQuery, safeArray } from "@/lib/utils";
import { BdUser } from "@/types/bd-model";
import { Request } from "express";
import { ProfessionalFilters } from "../models/professional-filters";

type BdProfessionalWithRoleAndProfessions = BdUser<{
  omit: {
    password: true;
  };
  include: {
    roles: {
      select: {
        role: {
          select: { id: true; name: true };
        };
      };
    };
    professions: {
      select: {
        profession: {
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
  private static _mapper(item: BdProfessionalWithRoleAndProfessions): ProfessionalModel {
    return {
      // id: item.id,
      user_id: item.id,
      names: item.names,
      uid: item.uid,
      rut: item.rut,
      last_names: item.last_names,
      phone: item.phone,
      email: item.email,
      address: "direccion indeterminada...",
      avatar_image: null,
      role: RoleMapper.response(item.roles.map((r) => r.role)),
      professions: ProfessionMapper.toArray(
        item.professions.map((i) => ({
          id: i.profession.id,
          name: i.profession.name
        }))
      )
    };
  }

  static validate(item: BdProfessionalWithRoleAndProfessions): ProfessionalModel {
    try {
      const data = ProfessionalMapper._mapper(item);
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
      const professions = item.professions.map((p) => p.profession.name);
      const data: ProfessionalForAppointmentDetailModel = {
        fullname: `${item.names} ${item.last_names}`,
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
}

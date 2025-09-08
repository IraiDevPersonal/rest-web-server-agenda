import { Prisma } from "@prisma/client";
import type { Response } from "express";
import { ZodError } from "zod";

export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message = "bad request") {
    return new CustomError(400, message);
  }

  static unautorized(message = "unautorized") {
    return new CustomError(401, message);
  }

  static forbidden(message = "forbidden") {
    return new CustomError(403, message);
  }

  static notFound(message = "not found") {
    return new CustomError(404, message);
  }

  static internalServer(message = "Internal server error") {
    return new CustomError(500, message);
  }

  static prismaError(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2003":
          return CustomError.badRequest(`One or more referenced IDs are invalid`);
        case "P2002": // Unique constraint
          return CustomError.badRequest(`This record already exists`);
        case "P2025": // Record not found
          return CustomError.notFound(`Record not found`);
        default:
          return CustomError.internalServer("An unexpected database error occurred");
      }
    }

    return undefined;
  }

  static bdError(message?: string) {
    return CustomError.internalServer(message ?? "An unexpected database error occurred");
  }

  static mapperError(error: unknown, reference: string) {
    const errorMessage = this.getErrorMessage(error);

    return CustomError.internalServer(`${reference}: ${errorMessage}`);
  }

  static handleError = (errorrr: unknown, res: Response) => {
    const bdError = this.prismaError(errorrr);
    const { message, statusCode } = CustomError.getErrorData(bdError ?? errorrr);
    console.log("ERROR: ", message);

    return res.status(statusCode).json({ error: message });
  };

  private static getErrorData(error: unknown): { statusCode: number; message: string } {
    const errorMessage = CustomError.getErrorMessage(error);

    if (error instanceof CustomError) {
      return { message: error.message, statusCode: error.statusCode };
    }

    if (error instanceof ZodError) {
      return { message: errorMessage, statusCode: 400 };
    }

    if (error instanceof Error) {
      return { message: errorMessage, statusCode: 500 };
    }

    return { message: errorMessage, statusCode: 500 };
  }

  private static getErrorMessage(error: unknown) {
    if (error instanceof CustomError) {
      return error.message;
    }

    if (error instanceof ZodError) {
      const issues = error.issues.map((issue) => `${String(issue.path.at(-1))}: ${issue.message}`);
      return issues.join(", ");
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "unknown error...";
  }
}

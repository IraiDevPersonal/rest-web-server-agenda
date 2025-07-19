import { Response } from "express";
import { ZodError } from "zod";

export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  static unautorized(message: string) {
    return new CustomError(401, message);
  }

  static forbidden(message: string) {
    return new CustomError(403, message);
  }

  static notFound(message: string) {
    return new CustomError(404, message);
  }

  static internalServer(message: string = "Internal server error") {
    return new CustomError(500, message);
  }

  static handleError = (error: unknown, res: Response) => {
    const { message, statusCode } = CustomError.getError(error);
    console.log("catch ", message);

    return res.status(statusCode).json({ error: message });
  };

  static getErrorMessage(error: unknown, fileName?: string) {
    console.log({ fileName });
    // El orden es importante: las clases de error más específicas deben comprobarse primero.
    if (error instanceof CustomError) {
      return error.message;
    }

    if (error instanceof ZodError) {
      const issues = error.errors.map(
        (issue) => `[${issue.path.join(".")}] ${issue.message}`
      );
      return `Error de validación: ${issues.join("; ")}`;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Error inesperado...";
  }

  static getError(error: unknown): { statusCode: number; message: string } {
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
}

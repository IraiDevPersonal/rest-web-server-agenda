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

  static mapperError(error: unknown, name: string) {
    const errorMessage = this.getErrorMessage(error);

    return CustomError.internalServer(`${name}: ${errorMessage}`);
  }

  static genericError(error: unknown, message: string, showLog: boolean = true) {
    const errorMessage = this.getErrorMessage(error);

    if (showLog) {
      console.log(errorMessage);
    }

    return CustomError.internalServer(message);
  }

  static handleError = (error: unknown, res: Response) => {
    const { message, statusCode } = CustomError.getErrorData(error);
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
      const issues = error.issues.map((issue) => `[${String(issue.path.at(-1))}: ${issue.message}]`);
      return issues.join(", ");
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Error inesperado...";
  }
}

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export const createAppError = (message: string, statusCode: number) => {
  return new AppError(message, statusCode);
};

export const errorHandler = (message: string, statusCode: number): never => {
  throw createAppError(message, statusCode);
};

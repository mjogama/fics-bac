class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

const errorHandler = (message: string, statusCode: number): never => {
  throw new AppError(message, statusCode);
};

export default errorHandler;

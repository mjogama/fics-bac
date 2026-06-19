const responseHandler = (res: any, status: boolean, statusCode: number, message: string, details: string | object | null | []) => {
  return res.status(statusCode).json({
    status,
    statusCode,
    message,
    details,
  });
};

export default responseHandler;

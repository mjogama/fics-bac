const responseHandler = (res: any, statusCode: number, message: string, data: string | {} | [] | null) => {
  return res.status(statusCode).json({
    status: "OK",
    statusCode,
    message,
    data,
  });
};

export default responseHandler;

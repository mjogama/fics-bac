const responseHandler = (res: any, status: string, statusCode: number, message: string | object | []) => {
  return res.status(statusCode).json({
    status,
    statusCode,
    details: {
      message,
    },
  });
};

export default responseHandler;

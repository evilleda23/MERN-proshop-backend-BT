export const HTTP_RESPONSE = (res, status, message, data) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};



const handleResponse = (res, status, message, data, success) => res.status(status).json({
  message,
  data,
  success,
});

export default handleResponse;

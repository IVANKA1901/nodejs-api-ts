const errorMessagesList = {
  400: "Bad Request",
  401: "Unauthorized",
  409: "Conflict",
  403: "Forbidden",
  404: "Not Found",
};
const HttpError = (status, message = errorMessagesList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;

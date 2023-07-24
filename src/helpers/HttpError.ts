const errorMessagesList: ErrorMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

interface ErrorMessages {
  [status: number]: string;
}

interface RequestError extends Error {
  status?: number;
}

const HttpError = (
  status: number,
  message: string = errorMessagesList[status]
): RequestError => {
  const error: RequestError = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;

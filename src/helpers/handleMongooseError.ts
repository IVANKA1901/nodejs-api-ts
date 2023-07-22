import { Document } from "mongoose";

interface IRequestError extends Error {
  status?: number;
  code?: number;
}

const handleMongooseError = (
  error: IRequestError,
  data: Document,
  next: () => void
) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

export default handleMongooseError;

import { isValidObjectId } from "mongoose";
import { Request, Response, NextFunction } from "express";

import { HttpError } from "../helpers";

const isValidId = (
  req: Request,
  res: Response,
  next: NextFunction
): void | never => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;

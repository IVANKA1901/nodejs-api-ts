import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

import { HttpError } from "../helpers";
import User from "../models/user-model";

import { envConfig } from "../configs/envConfig";
import { IUserAuth } from "interfaces";

interface IPayload {
  id?: string;
}

interface IRequest extends Request {
  user?: IUserAuth | null;
}

const authenticate = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, envConfig.SECRET_KEY) as IPayload;
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

export default authenticate;

import { Request } from "express";

export interface IRequest extends Request {
  email?: string;
  password?: string;
  user?: any;
  file?: any;
}

export interface IRequestCurrent extends Request {
  email?: string;
  subscription?: string;
  user?: any;
}

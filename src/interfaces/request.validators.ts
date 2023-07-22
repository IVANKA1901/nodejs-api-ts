import { Request } from "express";

export interface IRequest extends Request {
  email: string;
  password: string;
  user: any;
  file: any;
}

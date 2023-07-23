/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { ObjectId } from "mongoose";

export interface IAddContact {
  email: string;
  favorite?: boolean;
  name: string;
  phone: string;
  owner?: any;
}

export interface IUpdateFavorite {
  favorite: boolean;
}

export interface IGetAll extends Document {
  _id?: any;
  owner?: any;
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
  user?: string;
  file?: string;
  query?: any;
}
export interface IRequest extends Document {
  user: IGetAll;
  query?: any;
}

export interface IGetByID extends Document {
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
}

/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { Types } from "mongoose";

export interface IEmail {
  email: string;
}

export interface ISubscription {
  subscription: "starter" | "pro" | "business";
}

export interface IUserAuth {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  token?: string;
  subscription?: "starter" | "pro" | "business";
  avatarURL?: string;
  verify?: boolean;
  verificationToken?: string;
}

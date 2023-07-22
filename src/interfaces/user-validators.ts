/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface IEmail {
  email: string;
}

export interface ISubscription {
  subscription: "starter" | "pro" | "business";
}

export interface IUserAuth {
  email: string;
  password: string;
  subscription?: "starter" | "pro" | "business";
}
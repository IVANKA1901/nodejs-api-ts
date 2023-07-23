import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import jimp from "jimp";
import { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

import User from "models/user-model";
import { HttpError, ctrlWrapper, sendEmail } from "helpers";
import { envConfig } from "configs/envConfig";
import {
  ISubscription,
  IUserAuth,
  IRequest,
  IRequestCurrent,
} from "interfaces";

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const registerUser = async (
  req: Request,
  res: Response
): Promise<void> | never => {
  const { email, password } = req.body;

  const user: IUserAuth | null = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250" });
  const verificationToken = nanoid();

  const result: IUserAuth = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_new" href="${envConfig.BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const verifyEmail = async (req: Request, res: Response) => {
  const { verificationToken } = req.params;
  const user: IUserAuth | null = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(401, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user: IUserAuth | null = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email is not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_new" href="${envConfig.BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

const loginUser = async (
  req: Request,
  res: Response
): Promise<void> | never => {
  const { email, password } = req.body;
  const user: IUserAuth | null = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }

  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, envConfig.SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutUser = async (
  req: IRequest,
  res: Response
): Promise<void> | never => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(200).json({
    message: "Logout success",
  });
};
const getCurrentUser = async (req: IRequestCurrent, res: Response) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const updateSubscription = async (
  req: IRequest,
  res: Response
): Promise<void> | never => {
  const { _id } = req.user;
  const result: ISubscription | null = await User.findByIdAndUpdate(
    _id,
    req.body,
    {
      new: true,
    }
  );

  if (result !== null) {
    res.status(200).json({
      message: "Subscription successfully changed",
      subscription: result.subscription,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
};

const updateAvatar = async (
  req: IRequest,
  res: Response
): Promise<void> | never => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const image = await jimp.read(tempUpload);
  await image.resize(250, 250);
  await image.writeAsync(tempUpload);

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatar", filename);
  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.status(200).json({
    avatarURL,
  });
};

export const userControllers = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};

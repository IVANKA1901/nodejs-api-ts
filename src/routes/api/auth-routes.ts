import express from "express";

const router = express.Router();

import { userControllers } from "../../controllers/user-controller";
// import ctrl from "../../controllers/user-controller";
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../validators/user-validators");

router.post(
  "/register",
  validateBody(schemas.userAuthSchema, "missing fields"),
  userControllers.registerUser
);

router.get("/verify/:verificationToken", userControllers.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  userControllers.resendVerifyEmail
);

router.post(
  "/login",
  validateBody(schemas.userAuthSchema, "missing fields"),
  userControllers.loginUser
);

router.post("/logout", authenticate, userControllers.logoutUser);

router.get("/current", authenticate, userControllers.getCurrentUser);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema, "missing fields"),
  userControllers.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatars"),
  userControllers.updateAvatar
);

export default router;
